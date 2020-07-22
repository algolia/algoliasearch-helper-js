'use strict';

// NOTE: this behaves like lodash/defaults, but doesn't mutate the target
// it also preserve keys order
var PLACEHOLDER = '__PLACEHOLDER__';

module.exports = function defaultsPure() {
  var sources = Array.prototype.slice.call(arguments);

  var emptyObjectWithKeysInOrder = sources.reduceRight(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (source[key] === undefined) {
        return;
      }
      if (acc[key] === PLACEHOLDER) {
        // remove if already added, so that we can add it in correct order
        delete acc[key];
      }
      acc[key] = PLACEHOLDER;
    });
    return acc;
  }, {});

  return sources.reduce(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (source[key] !== undefined && acc[key] === PLACEHOLDER) {
        acc[key] = source[key];
      }
    });
    return acc;
  }, emptyObjectWithKeysInOrder);
};

