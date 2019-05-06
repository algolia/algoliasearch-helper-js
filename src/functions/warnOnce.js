'use strict';

try {
  var cache = [];

  module.exports = function warn(message) {
    if (cache.indexOf(message) > -1) {
      return;
    }
    cache.push(message);
    console.warn(message); // eslint-disable-line no-console
  };
} catch (e) {
  module.exports = function() {};
}
