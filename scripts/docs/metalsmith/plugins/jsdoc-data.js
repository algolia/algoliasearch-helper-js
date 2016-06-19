'use strict';
var jsdoc2md = require('jsdoc-to-markdown');
var path = require('path');
var collectJson = require('collect-json');
var keyBy = require('lodash/keyBy');

module.exports = function(opts) {
  if (!opts.src) throw new Error('opts.src must be defined');
  var src = path.join(__dirname, opts.src);
  var namespace = opts.namespace;

  return function(files, metalsmith, done) {
    jsdoc2md({src: src, json: true}).pipe(collectJson(dataReady));

    function dataReady(data) {
      var metadata = metalsmith.metadata();
      if (!namespace) metadata.jsdoc = keyBy(data, 'longname');
      else {
        metadata.jsdoc = {};
        metadata.jsdoc[namespace] = keyBy(data, 'name');
        console.log(JSON.stringify(metadata, null, 2));
      }
      done();
    }
  };
};
