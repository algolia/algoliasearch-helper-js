'use strict';

var _ = require('lodash');
var algoliasearchHelper = require('../../index');

var emptyClient = {};

test('Adding refinments should add an entry to the refinments attribute', function() {
  var facetName = 'facet1';
  var facetValue = '42';

  var helper = algoliasearchHelper(emptyClient, 'index', {
    facets: [facetName]
  });

  expect(_.isEmpty(helper.state.facetsRefinements)).toBeTruthy();
  helper.addRefine(facetName, facetValue);
  expect(_.size(helper.state.facetsRefinements) === 1).toBeTruthy();
  expect(helper.state.facetsRefinements.facet1).toEqual([facetValue]);
  helper.addRefine(facetName, facetValue);
  expect(_.size(helper.state.facetsRefinements) === 1).toBeTruthy();
  helper.removeRefine(facetName, facetValue);
  expect(_.size(helper.state.facetsRefinements) === 0).toBeTruthy();
});

test('Adding several refinements for a single attribute should be handled', function() {
  var facetName = 'facet';

  var helper = algoliasearchHelper(emptyClient, null, {
    facets: [facetName]
  });

  expect(_.isEmpty(helper.state.facetsRefinements)).toBeTruthy();
  helper.addRefine(facetName, 'value1');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 1).toBeTruthy();
  helper.addRefine(facetName, 'value2');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 2).toBeTruthy();
  helper.addRefine(facetName, 'value1');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 2).toBeTruthy();
});

test('Toggling several refinements for a single attribute should be handled', function() {
  var facetName = 'facet';

  var helper = algoliasearchHelper(emptyClient, null, {
    facets: [facetName]
  });

  expect(_.isEmpty(helper.state.facetsRefinements)).toBeTruthy();
  helper.toggleRefine(facetName, 'value1');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 1).toBeTruthy();
  helper.toggleRefine(facetName, 'value2');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 2).toBeTruthy();
  helper.toggleRefine(facetName, 'value1');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 1).toBeTruthy();
  expect(helper.state.facetsRefinements[facetName]).toEqual(['value2']);
});

test('Using toggleRefine on a non specified facet should throw an exception', function() {
  var helper = algoliasearchHelper(emptyClient, null, {});

  expect(_.partial(helper.toggleRefine, 'unknown', 'value')).toThrow();
});

test('Removing several refinements for a single attribute should be handled', function() {
  var facetName = 'facet';

  var helper = algoliasearchHelper(emptyClient, null, {
    facets: [facetName]
  });

  expect(_.isEmpty(helper.state.facetsRefinements)).toBeTruthy();
  helper.addRefine(facetName, 'value1');
  helper.addRefine(facetName, 'value2');
  helper.addRefine(facetName, 'value3');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 3).toBeTruthy();
  helper.removeRefine(facetName, 'value2');
  expect(_.size(helper.state.facetsRefinements[facetName]) === 2).toBeTruthy();
  expect(helper.state.facetsRefinements[facetName]).toEqual(['value1', 'value3']);
});

test('isDisjunctiveRefined', function() {
  var facet = 'MyFacet';

  var helper = algoliasearchHelper(emptyClient, null, {
    disjunctiveFacets: [facet]
  });

  var value = 'MyValue';

  expect(helper.isDisjunctiveRefined(facet, value)).toBe(false);

  helper.addDisjunctiveRefine(facet, value);
  expect(helper.isDisjunctiveRefined(facet, value)).toBe(true);

  helper.removeDisjunctiveRefine(facet, value);
  expect(helper.isDisjunctiveRefined(facet, value)).toBe(false);
});

test('IsRefined should return true if the (facet, value ) is refined.', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1']
  });

  helper.addRefine('facet1', 'boom');

  expect(helper.isRefined('facet1', 'boom')).toBe(true);

  expect(helper.isRefined('facet1', 'booohh')).toBe(false);
  expect(_.bind(helper.isRefined, helper, 'notAFacet', 'maoooh')).toThrow();
  expect(_.bind(helper.isRefined, helper, null, null)).toThrow();
});

test('isRefined(facet)/hasRefinements should return true if the facet is refined.', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1']
  });

  expect(helper.isRefined('facet1')).toBe(false);
  expect(helper.hasRefinements('facet1')).toBe(false);

  helper.addRefine('facet1', 'boom');

  expect(helper.isRefined('facet1')).toBe(true);
  expect(helper.hasRefinements('facet1')).toBe(true);

  expect(_.bind(helper.isRefined, helper, 'notAFacet')).toThrow();
  // in complete honesty we should be able to detect numeric facets but we can't
  // t.throws(helper.hasRefinements.bind(helper, 'notAFacet'), 'not a facet');
  expect(_.bind(helper.isRefined, null)).toThrow();
  expect(_.bind(helper.hasRefinements, null)).toThrow();
});

test('getRefinements should return all the refinements for a given facet', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1'],
    disjunctiveFacets: ['facet2', 'sales']
  });

  helper.addRefine('facet1', 'val1')
    .addRefine('facet1', 'val2')
    .addExclude('facet1', 'val-1')
    .toggleRefine('facet1', 'val3');

  helper.addDisjunctiveRefine('facet2', 'val4')
    .addDisjunctiveRefine('facet2', 'val5')
    .toggleRefine('facet2', 'val6');

  helper.addNumericRefinement('sales', '>', '3')
    .addNumericRefinement('sales', '<', '9');

  expect(helper.getRefinements('facet1')).toEqual([
    {value: 'val1', type: 'conjunctive'},
    {value: 'val2', type: 'conjunctive'},
    {value: 'val3', type: 'conjunctive'},
    {value: 'val-1', type: 'exclude'}
  ]);

  expect(helper.getRefinements('facet2')).toEqual([
    {value: 'val4', type: 'disjunctive'},
    {value: 'val5', type: 'disjunctive'},
    {value: 'val6', type: 'disjunctive'}
  ]);

  expect(helper.getRefinements('sales')).toEqual([
    {value: [3], operator: '>', type: 'numeric'},
    {value: [9], operator: '<', type: 'numeric'}
  ]);
});

test('getRefinements should return an empty array if the facet has no refinement', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1'],
    disjunctiveFacets: ['facet2']
  });

  expect(helper.getRefinements('facet1')).toEqual([]);
  expect(helper.getRefinements('facet2')).toEqual([]);
});

test('[Conjunctive] Facets should be resilient to user attempt to use numbers', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1'],
    disjunctiveFacets: ['facet2']
  });

  helper.addRefine('facet1', 42);
  expect(helper.isRefined('facet1', 42)).toBe(true);
  expect(helper.isRefined('facet1', '42')).toBe(true);

  var stateWithFacet1and42 = helper.state;

  helper.removeRefine('facet1', '42');
  expect(helper.isRefined('facet1', '42')).toBe(false);

  helper.setState(stateWithFacet1and42);
  helper.removeRefine('facet1', 42);
  expect(helper.isRefined('facet1', 42)).toBe(false);
});

test('[Disjunctive] Facets should be resilient to user attempt to use numbers', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1'],
    disjunctiveFacets: ['facet2']
  });

  helper.addExclude('facet1', 42);
  expect(helper.isExcluded('facet1', 42)).toBe(true);
  expect(helper.isExcluded('facet1', '42')).toBe(true);

  var stateWithFacet1Without42 = helper.state;

  helper.removeExclude('facet1', '42');
  expect(helper.isExcluded('facet1', '42')).toBe(false);

  helper.setState(stateWithFacet1Without42);
  helper.removeExclude('facet1', 42);
  expect(helper.isExcluded('facet1', 42)).toBe(false);
});

test('[Disjunctive] Facets should be resilient to user attempt to use numbers', function() {
  var helper = algoliasearchHelper(emptyClient, null, {
    facets: ['facet1'],
    disjunctiveFacets: ['facet2']
  });

  helper.addDisjunctiveRefine('facet2', 42);
  expect(helper.isDisjunctiveRefined('facet2', 42)).toBe(true);
  expect(helper.isDisjunctiveRefined('facet2', '42')).toBe(true);

  var stateWithFacet2and42 = helper.state;

  helper.removeDisjunctiveRefine('facet2', '42');
  expect(helper.isDisjunctiveRefined('facet2', '42')).toBe(false);
  helper.setState(stateWithFacet2and42);

  helper.removeDisjunctiveRefine('facet2', 42);
  expect(helper.isDisjunctiveRefined('facet2', 42)).toBe(false);
});
