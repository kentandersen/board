var fetch = require('./fetch');

module.exports = function (url) {
  return fetch(url, {cacheTTL: false})
          .then(fetchStatusHandler)
          .then(res => res.json())
};
