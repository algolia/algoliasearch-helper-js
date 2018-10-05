'use strict';

var algoliasearchHelper = require('../../index');

var _ = require('lodash');

var fakeClient = {};

describe('helper.hasRefinements(attribute)', function() {
  var helper;

  // cannot be tested since there's no way to know that a numeric refinement
  // was once added then removed thus we always return false when not found
  test.skip('undefined attribute', function(done) {
    setup();
    expect(_.partial(helper.hasRefinements, 'unknown')).toThrow();
    done();
  });

  describe('numericRefinement', function() {
    test('with refinement', function() {
      setup();
      helper.addNumericRefinement('price', '=', 1337);
      expect(helper.hasRefinements('price')).toBe(true);
    });

    test('without refinement', function() {
      setup();
      helper.addNumericRefinement('price', '=', 1337);
      helper.clearRefinements('price');
      expect(helper.hasRefinements('price')).toBe(false);
    });
  });

  describe('facet', function() {
    test('with refinement', function(done) {
      setup({
        facets: ['color']
      });
      helper.toggleFacetRefinement('color', 'red');
      expect(helper.hasRefinements('color')).toBe(true);
      done();
    });

    test('without refinement', function(done) {
      setup({
        facets: ['color']
      });
      expect(helper.hasRefinements('color')).toBe(false);
      done();
    });
  });

  describe('disjunctiveFacet', function() {
    test('with refinement', function(done) {
      setup({
        disjunctiveFacets: ['author']
      });
      helper.toggleFacetRefinement('author', 'John Spartan');
      expect(helper.hasRefinements('author')).toBe(true);
      done();
    });

    test('without refinement', function(done) {
      setup({
        disjunctiveFacets: ['author']
      });
      expect(helper.hasRefinements('author')).toBe(false);
      done();
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
