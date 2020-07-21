'use strict';

// NOTE: this behaves like lodash/defaults, but doesn't mutate the target
// it also preserve keys order
module.exports = function defaultsPure() {
  var sources = Array.prototype.slice.call(arguments);

  var keysInOrder = Object.keys(sources.reduceRight(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (source[key] === undefined) {
        return;
      }
      if (acc[key] === null) {
        // remove if already added, so that we can add it in correct order
        delete acc[key];
      }
      acc[key] = null;  // placeholder
    });
    return acc;
  }, {}));

  var merged = sources.reduce(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (source[key] !== undefined && !Object.hasOwnProperty.call(acc, key)) {
        acc[key] = source[key];
      }
    });
    return acc;
  }, {});

  var final = keysInOrder.reduce(function(acc, key) {
    acc[key] = merged[key];
    return acc;
  }, {});

  return final;
};
