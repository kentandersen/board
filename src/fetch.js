var fetch = require('node-fetch');
var HttpsProxyAgent = require('https-proxy-agent');
var omit = require('object.omit');
var cache = require('./cache');

const proxy = process.env.HTTP_PROXY;
const noProxy = (process.env.NO_PROXY || '').split(',').map(u => u.trim());

function shouldUseProxy(url) {
  if(!proxy) {
    return false;
  }

  return !noProxy.some(noProxyUrl => url.indexOf(noProxyUrl) > -1)
}

function fetchAHoy(url, options) {
  options = Object.assign({
    agent: shouldUseProxy(url) ? new HttpsProxyAgent(proxy) : undefined,
    followRedirect: true,
    maxRedirects: 10
  }, options);

  return fetch(url, options);
}

module.exports = (url, options={}) => {
  if(options.cacheTTL === false) {
    return fetchAHoy(url, omit(options, 'cacheTTL'));
  } else {
    return cache.get(url).catch(() => {
      return fetchAHoy(url, omit(options, 'cacheTTL'))
              .then(resp => resp.text())
              .then(text => cache.set(url, text, options.cacheTTL))
    }).then(text => ({
      text: () => Promise.resolve(text),
      json: () => Promise.resolve(JSON.parse(text))
    }));
  }
};
