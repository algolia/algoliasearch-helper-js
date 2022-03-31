'use strict';

var SearchResults = require('../../../src/SearchResults');
var SearchParameters = require('../../../src/SearchParameters');

test('getFacetValues(facetName) returns a list of values using the defaults', function() {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand');

  var expected = [
    {count: 386, isRefined: true, name: 'Apple', value: 'Apple'},
    {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
    {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'}
  ];

  expect(facetValues).toEqual(expected);
});

test(
  'getFacetValues(facetName) when no order is specified for isRefined the order is descending',
  function() {
    var data = require('./getFacetValues/disjunctive.json');
    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, data.content.results);

    var facetValues = result.getFacetValues('brand', {
      sortBy: ['isRefined']
    });

    var expected = result.getFacetValues('brand', {
      sortBy: ['isRefined:desc']
    });

    expect(facetValues).toEqual(expected);
  });

test('getFacetValues(facetName) when no order is specified for count the order is descending', function() {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand', {
    sortBy: ['count']
  });

  var expected = result.getFacetValues('brand', {
    sortBy: ['count:desc']
  });

  expect(facetValues).toEqual(expected);
});

test('getFacetValues(facetName) when no order is specified for name the order is ascending', function() {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand', {
    sortBy: ['name']
  });

  var expected = result.getFacetValues('brand', {
    sortBy: ['name:asc']
  });

  expect(facetValues).toEqual(expected);
});

test('getFacetValues(facetName) testing the sort function', function() {
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

  expect(facetValues).toEqual(expected);
});

test('getFacetValues(facetName) with disabled sorting', function() {
  var data = require('./getFacetValues/disjunctive.json');
  var searchParams = new SearchParameters(data.state);
  var result = new SearchResults(searchParams, data.content.results);

  var facetValues = result.getFacetValues('brand', {
    sortBy: function() {
      return 0;
    }
  });

  var expected = [
    {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
    {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
    {count: 386, isRefined: true, name: 'Apple', value: 'Apple'}
  ];

  expect(facetValues).toEqual(expected);
});

test('getFacetValues(conjunctive) returns correct facet values with the name `length`', function() {
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
    {name: 'length', value: 'length', count: 5, isRefined: false, isExcluded: false},
    {name: 'dogs', value: 'dogs', count: 0, isRefined: false, isExcluded: false}
  ];

  expect(facetValues).toEqual(expected);
  expect(facetValues.length).toBe(2);
});

test('getFacetValues(disjunctive) returns correct facet values with the name `length`', function() {
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
    {name: 'length', value: 'length', count: 5, isRefined: false},
    {name: 'dogs', value: 'dogs', count: 0, isRefined: false}
  ];

  expect(facetValues).toEqual(expected);
  expect(facetValues.length).toBe(2);
});

test('getFacetValues(conjunctive) returns escaped facet values', function() {
  var searchParams = new SearchParameters({
    index: 'instant_search',
    facets: ['type'],
    facetsRefinements: {
      type: ['dogs', '\\-20%']
    }
  });

  var result = {
    query: '',
    facets: {
      type: {
        'dogs': 1,
        '-something': 5,
        '-20%': 2
      }
    }
  };

  var results = new SearchResults(searchParams, [result, result]);

  var facetValues = results.getFacetValues('type');

  var expected = [
    {name: '-20%', value: '\\-20%', count: 2, isRefined: true, isExcluded: false},
    {name: 'dogs', value: 'dogs', count: 1, isRefined: true, isExcluded: false},
    {name: '-something', value: '\\-something', count: 5, isRefined: false, isExcluded: false}
  ];

  expect(facetValues).toEqual(expected);
  expect(facetValues.length).toBe(3);
});

test('getFacetValues(disjunctive) returns escaped facet values', function() {
  var searchParams = new SearchParameters({
    index: 'instant_search',
    disjunctiveFacets: ['type'],
    disjunctiveFacetsRefinements: {
      type: ['dogs', '\\-20%']
    }
  });

  var result = {
    query: '',
    facets: {
      type: {
        'dogs': 1,
        '-something': 5,
        '-20%': 2
      }
    }
  };

  var results = new SearchResults(searchParams, [result, result]);

  var facetValues = results.getFacetValues('type');

  var expected = [
    {name: '-20%', value: '\\-20%', count: 2, isRefined: true},
    {name: 'dogs', value: 'dogs', count: 1, isRefined: true},
    {name: '-something', value: '\\-something', count: 5, isRefined: false}
  ];

  expect(facetValues).toEqual(expected);
  expect(facetValues.length).toBe(3);
});

test('getFacetValues(hierachical) returns escaped facet values', function() {
  var searchParams = new SearchParameters({
    index: 'instant_search',
    hierarchicalFacets: [{
      name: 'type',
      attributes: ['type1', 'type2', 'type3']
    }],
    hierarchicalFacetsRefinements: {type: ['\\-something > discounts']}
  });

  var result = {
    query: '',
    facets: {
      type1: {
        'dogs': 1,
        '-something': 5
      },
      type2: {
        'dogs > hounds': 1,
        '-something > discounts': 5
      },
      type3: {
        '-something > discounts > -5%': 1,
        '-something > discounts > full price': 4
      }
    },
    exhaustiveFacetsCount: true
  };

  var results = new SearchResults(searchParams, [result, result, result]);

  var facetValues = results.getFacetValues('type');

  var expected = {
    data: [
      {
        count: 5,
        data: [
          {
            count: 5,
            data: [{
              count: 4,
              data: null,
              exhaustive: true,
              isRefined: false,
              name: 'full price',
              path: '-something > discounts > full price',
              value: '\\-something > discounts > full price'
            }, {
              count: 1,
              data: null,
              exhaustive: true,
              isRefined: false,
              name: '-5%',
              path: '-something > discounts > -5%',
              value: '\\-something > discounts > -5%'
            }],
            exhaustive: true,
            isRefined: true,
            name: 'discounts',
            path: '-something > discounts',
            value: '\\-something > discounts'
          }
        ],
        exhaustive: true,
        isRefined: true,
        name: '-something',
        path: '-something',
        value: '\\-something'
      },
      {
        count: 1,
        data: null,
        exhaustive: true,
        isRefined: false,
        name: 'dogs',
        path: 'dogs',
        value: 'dogs'
      }
    ],
    exhaustive: true,
    isRefined: true,
    name: 'type',
    path: null,
    value: null,
    count: null
  };

  expect(facetValues).toEqual(expected);
});

test('getFacetValues(unknown) returns undefined (does not throw)', function() {
  var searchParams = new SearchParameters({
    index: 'instant_search'
  });

  var result = {
    query: '',
    // it does not matter if the result here is given or not,
    // if something is not a parameter, it will not be read.
    facets: {}
  };

  var results = new SearchResults(searchParams, [result, result]);

  expect(results.getFacetValues('type')).toBeUndefined();
});
