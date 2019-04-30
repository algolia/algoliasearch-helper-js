'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setupSimple;

var algoliasearchHelper = require('../../');

var random = require('lodash/random');

var indexName = '_circle-algoliasearch-helper-js-' +
  (process.env.CIRCLE_BUILD_NUM || 'DEV') +
  'helper_sffv' + random(0, 5000);

var dataset = [
  {objectID: '1', f: 'ba', f2: ['b']},
  {objectID: '2', f: 'ba', f2: ['c', 'x']},
  {objectID: '3', f: 'ba', f2: ['d']},
  {objectID: '4', f: 'bb', f2: ['b']},
  {objectID: '5', f: 'bb', f2: ['c', 'y']}
];

var config = {
  attributesForFaceting: ['searchable(f)', 'searchable(f2)']
};

test(
  '[INT][SEARCHFORCETVALUES] Should be able to search for facet values - conjunctive',
  function() {
    return setup(indexName, dataset, config).then(function(client) {
      var helper = algoliasearchHelper(client, indexName, {
        facets: ['f', 'f2']
      });

      return helper.searchForFacetValues('f', 'a').then(function(content) {
        expect(content).toBeTruthy();
        expect(content.facetHits.length).toBe(0);

        return helper.searchForFacetValues('f', 'b');
      }).then(function(content) {
        expect(content).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'ba', highlighted: '<em>b</em>a', count: 3, isRefined: false},
          {value: 'bb', highlighted: '<em>b</em>b', count: 2, isRefined: false}
        ]);

        helper.addFacetRefinement('f2', 'c');

        return helper.searchForFacetValues('f', 'b');
      }).then(function(content) {
        expect(content).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'ba', highlighted: '<em>b</em>a', count: 1, isRefined: false},
          {value: 'bb', highlighted: '<em>b</em>b', count: 1, isRefined: false}
        ]);

        helper.clearRefinements().addFacetRefinement('f2', 'c');

        return helper.searchForFacetValues('f2', '');
      }).then(function(content) {
        expect(content).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'c', highlighted: 'c', count: 2, isRefined: true},
          {value: 'x', highlighted: 'x', count: 1, isRefined: false},
          {value: 'y', highlighted: 'y', count: 1, isRefined: false}
        ]);
      });
    });
  });

test(
  '[INT][SEARCHFORCETVALUES] Should be able to search for facet values - disjunctive',
  function() {
    return setup(indexName, dataset, config).then(function(client) {
      var helper = algoliasearchHelper(client, indexName, {
        disjunctiveFacets: ['f', 'f2']
      });

      return helper.searchForFacetValues('f', 'a').then(function(content) {
        expect(content).toBeTruthy();
        expect(content.facetHits.length).toBe(0);

        return helper.searchForFacetValues('f', 'b');
      }).then(function(content) {
        expect(content).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'ba', highlighted: '<em>b</em>a', count: 3, isRefined: false},
          {value: 'bb', highlighted: '<em>b</em>b', count: 2, isRefined: false}
        ]);

        helper.addDisjunctiveFacetRefinement('f2', 'd');

        return helper.searchForFacetValues('f', 'b');
      }).then(function(content) {
        expect(content).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'ba', highlighted: '<em>b</em>a', count: 1, isRefined: false}
        ]);

        helper.clearRefinements().addDisjunctiveFacetRefinement('f2', 'c');

        return helper.searchForFacetValues('f2', '');
      }).then(function(content) {
        expect(content).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'b', highlighted: 'b', count: 2, isRefined: false},
          {value: 'c', highlighted: 'c', count: 2, isRefined: true},
          {value: 'd', highlighted: 'd', count: 1, isRefined: false},
          {value: 'x', highlighted: 'x', count: 1, isRefined: false},
          {value: 'y', highlighted: 'y', count: 1, isRefined: false}
        ]);
      });
    });
  });


test(
  '[INT][SEARCHFORCETVALUES] Should be able to limit the number of returned items',
  function() {
    return setup(indexName, dataset, config).then(function(client) {
      var helper = algoliasearchHelper(client, indexName, {
        facets: ['f', 'f2']
      });

      return helper.searchForFacetValues('f', 'b', 1).then(function(content) {
        expect(content.facetHits.length).toBeTruthy();

        expect(content.facetHits).toEqual([
          {value: 'ba', highlighted: '<em>b</em>a', count: 3, isRefined: false}
        ]);
      });
    });
  });
