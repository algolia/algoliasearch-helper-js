'use strict';

// @MAJOR can be replaced by native Array#find when we change support
module.exports = function find(array, comparator) {
  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }
};
