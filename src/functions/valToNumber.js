'use strict';

var isNumber = require('lodash/isNumber');
var isString = require('lodash/isString');
function valToNumber(v) {
  if (isNumber(v)) {
    return v;
  } else if (isString(v)) {
    return parseFloat(v);
  } else if (Array.isArray(v)) {
    return v.map(valToNumber);
  }

  throw new Error('The value should be a number, a parseable string or an array of those.');
}

module.exports = valToNumber;
