'use strict';

module.exports = require('lodash/merge');

// NOTE: this behaves like lodash/merge, but doesn't mutate the target
// module.exports = function defaultsPure() {
//   const sources = Array.prototype.slice.call(arguments);
//   return sources.reduceRight(function(acc, source) {
//     Object.keys(Object(source)).forEach(function(key) {
//       if (source[key] !== undefined) {
//         acc[key] = source[key];
//       }
//     });
//     return acc;
//   }, {});
// };
