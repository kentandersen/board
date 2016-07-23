var NodeCache = require('node-cache');

const cache = new NodeCache({
  stdTTL: 15 * 60
});

exports.get = function(key) {
  return new Promise((resolve, reject) => {
    cache.get(key, (err, value) => {
      // if(err || value === undefined) {
      //   console.log(key, cache.keys());
      // }
      (err || value === undefined) ? reject(err) : resolve(value);
    });
  });
};

exports.set = function(key, value, ttl) {
  if(ttl && ttl instanceof Date) {
    // converting date object to remaining seconds
    ttl = Math.floor((ttl.valueOf() - Date.now()) / 1000);
  }

  return new Promise((resolve, reject) => {
    cache.set(key, value, ttl, err => err ? reject(err) : resolve(value));
  });
};
