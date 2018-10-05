'use strict';

var sinon = require('sinon');
var algoliaSearchHelper = require('../../index');

var fakeClient = {};

test('Change events should be emitted as soon as the state change, but search should be triggered (refactored)', function() {
  var helper = algoliaSearchHelper(fakeClient, 'Index', {
    disjunctiveFacets: ['city'],
    disjunctiveFacetsRefinements: {city: ['Paris']},
    facets: ['tower'],
    facetsRefinements: {tower: ['Empire State Building']},
    facetsExcludes: {tower: ['Empire State Building']},
    hierarchicalFacets: [],
    numericRefinements: {
      price: {'>': [300]}
    }
  });

  var changeEventCount = 0;

  helper.on('change', function() {
    changeEventCount++;
  });

  var stubbedSearch = sinon.stub(helper, '_search');

  helper.setQuery('a');
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(0);

  helper.clearRefinements();
  expect(changeEventCount).toBe(2);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addDisjunctiveRefine('city', 'Paris');
  expect(changeEventCount).toBe(3);
  expect(stubbedSearch.callCount).toBe(0);

  helper.removeDisjunctiveRefine('city', 'Paris');
  expect(changeEventCount).toBe(4);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addExclude('tower', 'Empire State Building');
  expect(changeEventCount).toBe(5);
  expect(stubbedSearch.callCount).toBe(0);

  helper.removeExclude('tower', 'Empire State Building');
  expect(changeEventCount).toBe(6);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addRefine('tower', 'Empire State Building');
  expect(changeEventCount).toBe(7);
  expect(stubbedSearch.callCount).toBe(0);

  helper.removeRefine('tower', 'Empire State Building');
  expect(changeEventCount).toBe(8);
  expect(stubbedSearch.callCount).toBe(0);

  helper.search();
  expect(changeEventCount).toBe(8);
  expect(stubbedSearch.callCount).toBe(1);
});

test('Change events should only be emitted for meaningful changes', function() {
  var helper = algoliaSearchHelper(fakeClient, 'Index', {
    query: 'a',
    disjunctiveFacets: ['city'],
    disjunctiveFacetsRefinements: {city: ['Paris']},
    facets: ['tower'],
    facetsRefinements: {tower: ['Empire State Building']},
    facetsExcludes: {tower: ['Empire State Building']},
    hierarchicalFacets: [{
      name: 'hierarchicalFacet',
      attributes: ['lvl1', 'lvl2']
    }],
    numericRefinements: {
      price: {'>': [300]}
    }
  });

  var changeEventCount = 0;

  helper.on('change', function() {
    changeEventCount++;
  });

  var stubbedSearch = sinon.stub(helper, '_search');

  helper.setQuery('a');
  expect(changeEventCount).toBe(0);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addDisjunctiveRefine('city', 'Paris');
  expect(changeEventCount).toBe(0);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addExclude('tower', 'Empire State Building');
  expect(changeEventCount).toBe(0);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addRefine('tower', 'Empire State Building');
  expect(changeEventCount).toBe(0);
  expect(stubbedSearch.callCount).toBe(0);

  helper.addNumericRefinement('price', '>', 300);
  expect(changeEventCount).toBe(0);
  expect(stubbedSearch.callCount).toBe(0);

  // This is an actual change
  helper.clearRefinements();
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(0);

  helper.clearRefinements();
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(0);

  helper.removeDisjunctiveRefine('city', 'Paris');
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(0);

  helper.removeExclude('tower', 'Empire State Building');
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(0);

  helper.removeRefine('tower', 'Empire State Building');
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(0);

  helper.search();
  expect(changeEventCount).toBe(1);
  expect(stubbedSearch.callCount).toBe(1);
});

test('search event should be emitted once when the search is triggered and before the request is sent', function() {
  var clientMock = {
    search: function() {
      return new Promise(function() {});
    }
  };
  var helper = algoliaSearchHelper(clientMock, 'Index', {
    disjunctiveFacets: ['city'],
    facets: ['tower']
  });

  var count = 0;

  helper.on('search', function() {
    count++;
  });

  clientMock.search = function() {
    expect(count).toBe(1);

    return new Promise(function() {});
  };

  helper.setQuery('');
  expect(count).toBe(0);

  helper.clearRefinements();
  expect(count).toBe(0);

  helper.addDisjunctiveRefine('city', 'Paris');
  expect(count).toBe(0);

  helper.removeDisjunctiveRefine('city', 'Paris');
  expect(count).toBe(0);

  helper.addExclude('tower', 'Empire State Building');
  expect(count).toBe(0);

  helper.removeExclude('tower', 'Empire State Building');
  expect(count).toBe(0);

  helper.addRefine('tower', 'Empire State Building');
  expect(count).toBe(0);

  helper.removeRefine('tower', 'Empire State Building');
  expect(count).toBe(0);

  helper.search();
  expect(count).toBe(1);
});

test('searchOnce event should be emitted once when the search is triggered using searchOnce and before the request is sent', function() {
  var clientMock = {};
  var helper = algoliaSearchHelper(clientMock, 'Index', {
    disjunctiveFacets: ['city'],
    facets: ['tower']
  });

  var count = 0;

  helper.on('searchOnce', function() {
    count++;
  });

  clientMock.search = function() {
    expect(count).toBe(1);

    return new Promise(function() {});
  };

  expect(count).toBe(0);

  helper.searchOnce({}, function() {});
  expect(count).toBe(1);
});

test('searchForFacetValues event should be emitted once when the search is triggered using' +
     ' searchForFacetValues and before the request is sent', function() {
  var clientMock = {};
  var helper = algoliaSearchHelper(clientMock, 'Index', {
    disjunctiveFacets: ['city'],
    facets: ['tower']
  });

  var count = 0;

  helper.on('searchForFacetValues', function() {
    count++;
  });

  clientMock.initIndex = function() {
    return {
      searchForFacetValues: function() {
        expect(count).toBe(1);

        return new Promise(function() {});
      }
    };
  };

  expect(count).toBe(0);

  helper.searchForFacetValues();
  expect(count).toBe(1);
});
