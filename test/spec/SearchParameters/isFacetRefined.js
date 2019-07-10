'use strict';

var SearchParameters = require('../../../src/SearchParameters');

test('isFacetRefined returns true if value in facetsRefinements', function() {
  var state = new SearchParameters({
    facets: ['test'],
    facetsRefinements: {
      test: ['zongo']
    }
  });

  expect(state.isFacetRefined('test', 'zongo')).toBe(true);
});

test('isFacetRefined returns false if value not in facetsRefinements', function() {
  var state = new SearchParameters({
    facets: ['test'],
    facetsRefinements: {
      test: ['zongo']
    }
  });

  expect(state.isFacetRefined('test', 'not zongo')).toBe(false);
});

test('isFacetRefined returns false if facet is not conjunctive', function() {
  var state = new SearchParameters({
    facetsRefinements: {
      test: ['zongo']
    }
  });

  expect(state.isFacetRefined('test', 'zongo')).toBe(false);
});
