'use strict';

var sinon = require('sinon');
var algoliaSearch = require('algoliasearch');

var algoliasearchHelper = require('../index');

test('Search should call the algolia client according to the number of refinements', function(done) {
  var testData = require('./../test-utils/search.testdata.js')();

  var client = algoliaSearch('dsf', 'dsfdf');
  var mock = sinon.mock(client);

  mock.expects('search').once().resolves(testData.response);

  var helper = algoliasearchHelper(client, 'test_hotels-node', {
    disjunctiveFacets: ['city']
  });

  helper.addDisjunctiveRefine('city', 'Paris', true);
  helper.addDisjunctiveRefine('city', 'New York', true);

  helper.on('result', function(data) {
    // shame deepclone, to remove any associated methods coming from the results
    expect(JSON.parse(JSON.stringify(data))).toEqual(JSON.parse(JSON.stringify(testData.responseHelper)));

    var cityValues = data.getFacetValues('city');
    var expectedCityValues = [
      {name: 'Paris', count: 3, isRefined: true},
      {name: 'New York', count: 1, isRefined: true},
      {name: 'San Francisco', count: 1, isRefined: false}
    ];

    expect(cityValues).toEqual(expectedCityValues);

    var cityValuesCustom = data.getFacetValues('city', {sortBy: ['count:asc', 'name:asc']});
    var expectedCityValuesCustom = [
      {name: 'New York', count: 1, isRefined: true},
      {name: 'San Francisco', count: 1, isRefined: false},
      {name: 'Paris', count: 3, isRefined: true}
    ];


    expect(cityValuesCustom).toEqual(expectedCityValuesCustom);

    var cityValuesFn = data.getFacetValues('city', {sortBy: function(a, b) { return a.count - b.count; }});
    var expectedCityValuesFn = [
      {name: 'New York', count: 1, isRefined: true},
      {name: 'San Francisco', count: 1, isRefined: false},
      {name: 'Paris', count: 3, isRefined: true}
    ];

    expect(cityValuesFn).toEqual(expectedCityValuesFn);

    var queries = mock.expectations.search[0].args[0][0];
    for (var i = 0; i < queries.length; i++) {
      var query = queries[i];
      expect(query.query).toBe(undefined);
      expect(query.params.query).toBe('');
    }
    expect(mock.verify()).toBeTruthy();

    done();
  });

  helper.search('');
});

test('Search should not mutate the original client response', function(done) {
  var testData = require('./../test-utils/search.testdata.js')();

  var client = algoliaSearch('dsf', 'dsfdf');
  var mock = sinon.mock(client);

  mock.expects('search').once().resolves(testData.response);

  var helper = algoliasearchHelper(client, 'test_hotels-node');

  var originalResponseLength = testData.response.results.length;

  helper.on('result', function() {
    var currentResponseLength = testData.response.results.length;

    expect(currentResponseLength).toBe(originalResponseLength);

    done();
  });

  helper.search('');
});

test('no mutating methods should trigger a search', function() {
  var client = algoliaSearch('dsf', 'dsfdf');
  sinon.mock(client);

  var helper = algoliasearchHelper(client, 'Index', {
    disjunctiveFacets: ['city'],
    facets: ['tower']
  });

  var stubbedSearch = sinon.stub(helper, '_search');

  helper.setQuery('');
  helper.clearRefinements();
  helper.addDisjunctiveRefine('city', 'Paris');
  helper.removeDisjunctiveRefine('city', 'Paris');
  helper.addExclude('tower', 'Empire State Building');
  helper.removeExclude('tower', 'Empire State Building');
  helper.addRefine('tower', 'Empire State Building');
  helper.removeRefine('tower', 'Empire State Building');

  expect(stubbedSearch.callCount).toBe(0);

  helper.search();

  expect(stubbedSearch.callCount).toBe(1);
});
