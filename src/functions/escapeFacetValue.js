'use strict';

/**
 * Replaces a leading - with \-
 * @private
 * @param {string} value the facet value to replace
 * @returns string
 */
module.exports = function escapeFacetValue(value) {
  return value.replace(/^-/, '\\-');
};
