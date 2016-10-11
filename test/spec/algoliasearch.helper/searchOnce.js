'use strict';

var test = require('tape');
var sinon = require('sinon');
var algoliaSearch = require('algoliasearch');
var SearchParameters = require('../../../src/SearchParameters');

var algoliasearchHelper = require('../../../index');

test('searchOnce should call the algolia client according to the number of refinements and call callback with no error and with results when no error', function(t) {
  var testData = require('../search.testdata');

  var client = algoliaSearch('dsf', 'dsfdf');
  var mock = sinon.mock(client);

  mock.expects('search').once().yields(null, testData.response);

  var helper = algoliasearchHelper(client, 'test_hotels-node');

  var parameters = new SearchParameters({
    disjunctiveFacets: ['city']
  })
    .setIndex('test_hotels-node')
    .addDisjunctiveFacetRefinement('city', 'Paris')
    .addDisjunctiveFacetRefinement('city', 'New York');

  helper.searchOnce(parameters, function(err, data) {
    t.equal(err, null, 'should be equal');

    // shame deepclone, to remove any associated methods coming from the results
    t.deepEqual(
      JSON.parse(JSON.stringify(data)),
      JSON.parse(JSON.stringify(testData.responseHelper)),
      'should be equal'
    );

    var cityValues = data.getFacetValues('city');
    var expectedCityValues = [
      {name: 'Paris', count: 3, isRefined: true},
      {name: 'New York', count: 1, isRefined: true},
      {name: 'San Francisco', count: 1, isRefined: false}
    ];

    t.deepEqual(
      cityValues,
      expectedCityValues,
      'Facet values for "city" should be correctly ordered using the default sort'
    );

    var cityValuesCustom = data.getFacetValues('city', {sortBy: ['count:asc', 'name:asc']});
    var expectedCityValuesCustom = [
      {name: 'New York', count: 1, isRefined: true},
      {name: 'San Francisco', count: 1, isRefined: false},
      {name: 'Paris', count: 3, isRefined: true}
    ];

    t.deepEqual(
      cityValuesCustom,
      expectedCityValuesCustom,
      'Facet values for "city" should be correctly ordered using a custom sort'
    );

    var cityValuesFn = data.getFacetValues('city', {sortBy: function(a, b) { return a.count - b.count; }});
    var expectedCityValuesFn = [
      {name: 'New York', count: 1, isRefined: true},
      {name: 'San Francisco', count: 1, isRefined: false},
      {name: 'Paris', count: 3, isRefined: true}
    ];

    t.deepEqual(
      cityValuesFn,
      expectedCityValuesFn,
      'Facet values for "city" should be correctly ordered using a sort function'
    );

    var queries = mock.expectations.search[0].args[0][0];
    for (var i = 0; i < queries.length; i++) {
      var query = queries[i];
      t.equal(query.query, undefined);
      t.equal(query.params.query, '');
    }
    t.ok(mock.verify(), 'Mock constraints should be verified!');

    t.end();
  });
});

test('searchOnce should call the algolia client according to the number of refinements and call callback with error and no results when error', function(t) {
  var client = algoliaSearch('dsf', 'dsfdf');
  var mock = sinon.mock(client);

  var error = {message: 'error'};
  mock.expects('search').once().yields(error, null);

  var helper = algoliasearchHelper(client, 'test_hotels-node');

  var parameters = new SearchParameters({
    disjunctiveFacets: ['city']
  })
    .setIndex('test_hotels-node')
    .addDisjunctiveFacetRefinement('city', 'Paris')
    .addDisjunctiveFacetRefinement('city', 'New York');

  helper.searchOnce(parameters, function(err, data) {
    t.equal(err, error, 'should be equal');
    t.equal(data, null, 'should be equal');

    var queries = mock.expectations.search[0].args[0][0];
    for (var i = 0; i < queries.length; i++) {
      var query = queries[i];
      t.equal(query.query, undefined);
      t.equal(query.params.query, '');
    }
    t.ok(mock.verify(), 'Mock constraints should be verified!');

    t.end();
  });
});
