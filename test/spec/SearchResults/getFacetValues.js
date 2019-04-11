'use strict';

var test = require('tape');

var SearchResults = require('../../../src/SearchResults');
var SearchParameters = require('../../../src/SearchParameters');

test('getFacetValues(facetName) returns a list of values using the defaults', function(t) {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand');

  var expected = [
    {count: 386, isRefined: true, name: 'Apple'},
    {count: 551, isRefined: false, name: 'Insignia™'},
    {count: 511, isRefined: false, name: 'Samsung'}
  ];

  t.deepEqual(facetValues, expected);

  t.end();
});

test(
  'getFacetValues(facetName) when no order is specified for isRefined the order is descending',
  function(t) {
    var data = require('./getFacetValues/disjunctive.json');
    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, data.content.results);

    var facetValues = result.getFacetValues('brand', {
      sortBy: ['isRefined']
    });

    var expected = result.getFacetValues('brand', {
      sortBy: ['isRefined:desc']
    });

    t.deepEqual(facetValues, expected);

    t.end();
  });

test('getFacetValues(facetName) when no order is specified for count the order is descending', function(t) {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand', {
    sortBy: ['count']
  });

  var expected = result.getFacetValues('brand', {
    sortBy: ['count:desc']
  });

  t.deepEqual(facetValues, expected);

  t.end();
});

test('getFacetValues(facetName) when no order is specified for name the order is ascending', function(t) {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand', {
    sortBy: ['name']
  });

  var expected = result.getFacetValues('brand', {
    sortBy: ['name:asc']
  });

  t.deepEqual(facetValues, expected);

  t.end();
});

test('getFacetValues(facetName) testing the sort function', function(t) {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand', {
    sortBy: function(a, b) {
      if (a.count === b.count) return 0;
      if (a.count > b.count)   return 1;
      if (b.count > a.count)   return -1;
    }
  });

  var expected = result.getFacetValues('brand', {
    sortBy: ['count:asc']
  });

  t.deepEqual(facetValues, expected);

  t.end();
});

test('getFacetValues(conjunctive) returns correct facet values with the name `length`', function(t) {
  var searchParams = new SearchParameters({
    index: 'instant_search',
    facets: ['type']
  });

  var result = {
    query: '',
    facets: {
      type: {
        dogs: 0,
        // the key length in an object makes it an array for lodash
        length: 5
      }
    }
  };

  var results = new SearchResults(searchParams, [result, result]);

  var facetValues = results.getFacetValues('type');

  var expected = [
    {name: 'length', count: 5, isRefined: false, isExcluded: false},
    {name: 'dogs', count: 0, isRefined: false, isExcluded: false}
  ];

  t.deepEqual(facetValues, expected);
  t.equal(facetValues.length, 2);

  t.end();
});

test('getFacetValues(disjunctive) returns correct facet values with the name `length`', function(t) {
  var searchParams = new SearchParameters({
    index: 'instant_search',
    disjunctiveFacets: ['type']
  });

  var result = {
    query: '',
    facets: {
      type: {
        dogs: 0,
        // the key length in an object makes it an array for lodash
        length: 5
      }
    }
  };

  var results = new SearchResults(searchParams, [result, result]);

  var facetValues = results.getFacetValues('type');

  var expected = [
    {name: 'length', count: 5, isRefined: false},
    {name: 'dogs', count: 0, isRefined: false}
  ];

  t.deepEqual(facetValues, expected);
  t.equal(facetValues.length, 2);

  t.end();
});
