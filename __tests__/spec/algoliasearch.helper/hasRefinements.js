'use strict';

var algoliasearchHelper = require('../../../index');

var _ = require('lodash');

var fakeClient = {};

describe('helper.hasRefinements(attribute)', function() {
  var helper;

  // cannot be tested since there's no way to know that a numeric refinement
  // was once added then removed thus we always return false when not found
  test.skip('undefined attribute', function(tt) {
    setup();
    tt.throws(_.partial(helper.hasRefinements, 'unknown'), Error, 'it throws when unknown attribute');
    tt.end();
  });

  describe('numericRefinement', function(tt) {
    test('with refinement', function(ttt) {
      setup();
      helper.addNumericRefinement('price', '=', 1337);
      ttt.equal(helper.hasRefinements('price'), true);
      ttt.end();
    });

    test('without refinement', function(ttt) {
      setup();
      helper.addNumericRefinement('price', '=', 1337);
      helper.clearRefinements('price');
      ttt.equal(helper.hasRefinements('price'), false);
      ttt.end();
    });
  });

  describe('facet', function(tt) {
    test('with refinement', function(ttt) {
      setup({
        facets: ['color']
      });
      helper.toggleFacetRefinement('color', 'red');
      ttt.equal(helper.hasRefinements('color'), true);
      ttt.end();
    });

    test('without refinement', function(ttt) {
      setup({
        facets: ['color']
      });
      ttt.equal(helper.hasRefinements('color'), false);
      ttt.end();
    });
  });

  describe('disjunctiveFacet', function(tt) {
    test('with refinement', function(ttt) {
      setup({
        disjunctiveFacets: ['author']
      });
      helper.toggleFacetRefinement('author', 'John Spartan');
      ttt.equal(helper.hasRefinements('author'), true);
      ttt.end();
    });

    test('without refinement', function(ttt) {
      setup({
        disjunctiveFacets: ['author']
      });
      ttt.equal(helper.hasRefinements('author'), false);
      ttt.end();
    });
  });

  describe('hierarchicalFacet', function() {
    test('with refinement', function() {
      setup({
        hierarchicalFacets: [{
          name: 'category',
          attributes: ['category.lvl0', 'category.lvl1']
        }]
      });
      helper.toggleFacetRefinement('category', 'Action Movies > Max');
      expect(helper.hasRefinements('category')).toBe(true);
    });

    test('without refinement', function() {
      setup({
        hierarchicalFacets: [{
          name: 'category',
          attributes: ['category.lvl0', 'category.lvl1']
        }]
      });
      expect(helper.hasRefinements('category')).toBe(false);
    });
  });

  function setup(params) {
    helper = algoliasearchHelper(fakeClient, 'index', params);
  }
});
