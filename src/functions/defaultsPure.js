'use strict';

// NOTE: this behaves like lodash/defaults, but doesn't mutate the target
// it also preserve keys order
module.exports = function defaultsPure() {
  var sources = Array.prototype.slice.call(arguments);
  var mergedSources = sources.reduceRight(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (source[key] !== undefined) {
        acc[key] = source[key];
      }
    });
    return acc;
  }, {});

  var orderedKeys = sources.reduce(function(acc, source) {
    Object.keys(Object(source)).forEach(function(key) {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);

  return orderedKeys.reduce(function(acc, key) {
    acc[key] = mergedSources[key];

    return acc;
  }, {});
};
