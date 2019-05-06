'use strict';

module.exports = function compact(array) {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter(function(element) {
    return Boolean(element);
  });
};
