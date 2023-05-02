'use strict';
var jsdocParse = require('jsdoc-parse');
var collectJson = require('collect-json');
var keyBy = require('lodash.keyby');

module.exports = function(opts) {
  if (!opts.src) throw new Error('opts.src must be defined');
  var namespace = opts.namespace;

  return function(files, metalsmith, done) {
    var src = metalsmith.path(opts.src);
    jsdocParse({src: src, json: true}).pipe(collectJson(dataReady));

    function dataReady(data) {
      var filteredData = data.filter(function(o) {return !o.deprecated;});
      var metadata = metalsmith.metadata();
      if (!namespace) metadata.jsdoc = keyBy(filteredData, 'longname');
      else {
        metadata.jsdoc = metadata.jsdoc || {};
        metadata.jsdoc[namespace] = keyBy(filteredData, 'name');
        // console.log(JSON.stringify(metadata.jsdoc, null, 2));
      }
      done();
    }
  };
};
