'use strict';
var path = require('path');
var fs = require('fs');

var Benchmark = require('benchmark');
var download = require('download');

download('https://cdn.jsdelivr.net/algoliasearch.helper/2/algoliasearch.helper.min.js',
         __dirname)
  .then(function() {
    var currentHelper = require('../../dist/algoliasearch.helper.min.js');
    var previousHelper = require('./algoliasearch.helper.min.js');

    var tests = [
      './tests/instanciate.js'
    ];

    tests.forEach(makeTestPerf.bind(null, currentHelper, previousHelper));
  }, function() {
    process.exit(1);
  }).then(function() {
    rmReferenceBuild();
  });

function rmReferenceBuild() {
  var p = path.join(__dirname, 'algoliasearch.helper.min.js');
  fs.unlink(p);
}

function makeTestPerf(previousHelper, currentHelper, testFile) {
  test(testFile + ' vs helper v.' + previousHelper.version, function(done) {
    expect.assertions(1);
    var suite = new Benchmark.Suite;
    suite.add('current', require(testFile)(currentHelper))
         .add('previous', require(testFile)(previousHelper));

    suite.on('complete', function() {
      var currentStats = getStats(this['0']);
      var previousStats = getStats(this['1']);

      if (currentStats.mean <= previousStats.mean) {} else {
        done.fail('Previous build is faster: ' + currentStats.mean + ' vs ' + previousStats.mean);
      }
      return;
    });

    suite.run();
  });
}

function getStats(bench) {
  return bench.stats;
}
