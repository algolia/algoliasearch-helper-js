'use strict';

var SearchParameters = require('../../../src/SearchParameters');
var SearchResults = require('../../../src/SearchResults');

test('processingTime should be the sum of all individual times', function() {
  var result = new SearchResults(new SearchParameters(), [
    {
      processingTimeMS: 1
    },
    {
      processingTimeMS: 1
    }
  ]);

  expect(result.processingTimeMS).toBe(2);
});

test('processingTime should be NaN for one value undefined', function() {
  var result = new SearchResults(new SearchParameters(), [
    {
      processingTimeMS: undefined
    },
    {
      processingTimeMS: 1
    }
  ]);

  expect(result.processingTimeMS).toBe(NaN);
});
