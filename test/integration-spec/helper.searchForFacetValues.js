'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setupSimple;

var algoliasearchHelper = utils.isCIBrowser ? window.algoliasearchHelper : require('../../');

var test = require('tape');
var bind = require('lodash/bind');
var random = require('lodash/random');

if (!utils.shouldRun) {
  test = test.skip;
}
var indexName = '_travis-algoliasearch-helper-js-' +
  (process.env.TRAVIS_BUILD_NUMBER || 'DEV') +
  'helper_searchonce' + random(0, 5000);

var dataset = [
  {objectID: '1', facet: ['f1', 'f2'], f2: ['a']},
  {objectID: '2', facet: ['f1', 'f3'], f2: ['b']},
  {objectID: '3', facet: ['f2', 'f3'], f2: ['c']}
];

var config = {
  attributesToIndex: ['facet'],
  attributesForFaceting: ['facet', 'f2']
};

test(
  '[INT][SEARCHFORCETVALUES] Should be able to search for facet values - conjunctive',
  function(t) {
    setup(indexName, dataset, config).
    then(function(client) {
      var helper = algoliasearchHelper(client, indexName, {
        facets: ['facet', 'f2']
      });

      helper.searchForFacetValues('facet', 'a').then(function(content) {
        t.ok(content, 'should get some content');
        t.equal(content.facetHits.length, 0, 'should get 0 results');

        return helper.searchForFacetValues('facet', 'f');
      }).then(function(content) {
        t.ok(content, 'should get some content');

        t.deepEqual(content.facetHits, [
          {value: 'f1', highlighted: '<em>f</em>1', count: 2},
          {value: 'f2', highlighted: '<em>f</em>2', count: 2},
          {value: 'f3', highlighted: '<em>f</em>3', count: 2}
        ]);

        helper.addFacetRefinement('facet', 'f2');
        return helper.searchForFacetValues('facet', 'f');
      }).then(function(content) {
        t.ok(content, 'should get some content');

        t.deepEqual(content.facetHits, [
          {value: 'f2', highlighted: '<em>f</em>2', count: 2},
          {value: 'f1', highlighted: '<em>f</em>1', count: 1},
          {value: 'f3', highlighted: '<em>f</em>3', count: 1}
        ]);

        helper.clearRefinements().addFacetRefinement('f2', 'a');
        return helper.searchForFacetValues('facet', 'f');
      }).then(function(content) {
        t.ok(content, 'should get some content');

        t.deepEqual(content.facetHits, [
          {value: 'f1', highlighted: '<em>f</em>1', count: 1},
          {value: 'f2', highlighted: '<em>f</em>2', count: 1}
        ]);

        t.end();
      }).catch(function(err) {
        setTimeout(function() {throw err;}, 1);
      });
    }).then(null, bind(t.error, t));
  });

test(
  '[INT][SEARCHFORCETVALUES] Should be able to search for facet values - disjunctive',
  function(t) {
    setup(indexName, dataset, config).
    then(function(client) {
      var helper = algoliasearchHelper(client, indexName, {
        disjunctiveFacets: ['facet', 'f2']
      });

      helper.searchForFacetValues('facet', 'a').then(function(content) {
        t.ok(content, 'should get some content');
        t.equal(content.facetHits.length, 0, 'should get 0 results');

        return helper.searchForFacetValues('facet', 'f');
      }).then(function(content) {
        t.ok(content, 'should get some content');

        t.deepEqual(content.facetHits, [
          {value: 'f1', highlighted: '<em>f</em>1', count: 2},
          {value: 'f2', highlighted: '<em>f</em>2', count: 2},
          {value: 'f3', highlighted: '<em>f</em>3', count: 2}
        ]);

        helper.addDisjunctiveFacetRefinement('facet', 'f2');
        return helper.searchForFacetValues('facet', 'f');
      }).then(function(content) {
        t.ok(content, 'should get some content');

        t.deepEqual(content.facetHits, [
          {value: 'f1', highlighted: '<em>f</em>1', count: 2},
          {value: 'f2', highlighted: '<em>f</em>2', count: 2},
          {value: 'f3', highlighted: '<em>f</em>3', count: 2}
        ]);

        helper.clearRefinements().addDisjunctiveFacetRefinement('f2', 'a');
        return helper.searchForFacetValues('facet', 'f');
      }).then(function(content) {
        t.ok(content, 'should get some content');

        t.deepEqual(content.facetHits, [
          {value: 'f1', highlighted: '<em>f</em>1', count: 2},
          {value: 'f2', highlighted: '<em>f</em>2', count: 2},
          {value: 'f3', highlighted: '<em>f</em>3', count: 2}
        ]);

        t.end();
      }).catch(function(err) {
        setTimeout(function() {throw err;}, 1);
      });
    }).then(null, bind(t.error, t));
  });

