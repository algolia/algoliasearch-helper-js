'use strict';

var deepmerge = require('deepmerge');

function arrayMerge(destinationArray, sourceArray) {
  if (!Array.isArray(destinationArray) || !Array.isArray(sourceArray)) {
    return sourceArray;
  }

  var longestLength = Math.max(destinationArray.length, sourceArray.length);
  var target = [];
  for (var i = 0; i < longestLength; i++) {
    target[i] = sourceArray.hasOwnProperty(i)
      ? sourceArray[i]
      : destinationArray[i];
  }
  return target;
}

function merge() {
  var sources = Array.prototype.slice.call(arguments);
  var target = sources.shift() || {};

  if (sources.every(function(source) {
    return source === target;
  })) {
    return target;
  }

  return deepmerge.all([target].concat(sources.filter(Boolean)), {
    arrayMerge: arrayMerge
  });
}

module.exports = merge;
