'use strict';

var test = require('tape');

var SearchParameters = require('../../../src/SearchParameters');

test('addFacet should add a facet to the facets list', function(t) {
  var state = SearchParameters.make({}).addFacet('facet');

  t.deepEquals(state.facets, ['facet']);

  t.end();
});

test('removeFacet should remove a facet from the facets list', function(t) {
  var state = SearchParameters.make({}).addFacet('facet').removeFacet('facet');

  t.deepEquals(state.facets, []);

  t.end();
});

test('addDisjunctiveFacet should add a facet to the disjunctiveFacets list', function(t) {
  var state = SearchParameters.make({}).addDisjunctiveFacet('facet');

  t.deepEquals(state.disjunctiveFacets, ['facet']);

  t.end();
});

test('removeDisjunctiveFacet should remove a facet from the disjunctiveFacets list', function(t) {
  var state = SearchParameters.make({})
    .addDisjunctiveFacet('facet')
    .removeDisjunctiveFacet('facet');

  t.deepEquals(state.disjunctiveFacets, []);

  t.end();
});

test('addHierarchicalFacet should add a facet to the hierarchicalFacets list', function(t) {
  var state = SearchParameters.make({}).addHierarchicalFacet({name: 'facet'});

  t.deepEquals(state.hierarchicalFacets, [{name: 'facet'}]);

  t.end();
});

test('removeHierarchicalFacet should remove a facet from the hierarchicalFacets list', function(t) {
  var state = SearchParameters.make({})
    .addHierarchicalFacet({name: 'facet'})
    .removeHierarchicalFacet('facet');

  t.deepEquals(state.hierarchicalFacets, []);

  t.end();
});
