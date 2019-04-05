'use strict';

var test = require('tape');
var algoliasearchHelper = require('../../../index');

var SearchParameters = algoliasearchHelper.SearchParameters;

var fakeClient = {};

test('setState should set the state of the helper and trigger a change event', function(t) {
  var state0 = {query: 'a query'};
  var state1 = {query: 'another query'};

  var helper = algoliasearchHelper(fakeClient, null, state0);

  t.deepEquals(helper.state, new SearchParameters(state0), '(setstate) initial state should be state0');

  helper.on('change', function(newState) {
    t.deepEquals(
      helper.state,
      new SearchParameters(state1),
      '(setState) the state in the helper should be changed to state1');
    t.deepEquals(
      newState,
      new SearchParameters(state1),
      '(setState) the state parameter of the event handler should be set to state1');
    t.end();
  });

  helper.setState(state1);
});

test('getState should return the current state of the helper', function(t) {
  var initialState = {query: 'a query'};
  var helper = algoliasearchHelper(fakeClient, null, initialState);

  t.deepEquals(helper.getState(),
    new SearchParameters(initialState),
    '(getState) getState returned value should be equivalent to initialstate as a new SearchParameters');
  t.deepEquals(helper.getState(),
    helper.state,
    '(getState) getState returned value should be equivalent to the internal state of the helper');

  t.end();
});

test('getState should return an object according to the specified filters', function(t) {
  var initialState = {
    query: 'a query',
    facets: ['facetA', 'facetWeDontCareAbout'],
    disjunctiveFacets: ['facetB'],
    hierarchicalFacets: [{
      name: 'facetC',
      attributes: ['facetC']
    }],
    minWordSizefor1Typo: 1
  };
  var index = 'indexNameInTheHelper';
  var helper = algoliasearchHelper(fakeClient, index, initialState);

  helper.toggleRefine('facetA', 'a');
  helper.toggleRefine('facetWeDontCareAbout', 'v');
  helper.toggleRefine('facetB', 'd');
  helper.toggleRefine('facetC', 'menu');
  helper.addNumericRefinement('numerical', '=', 3);
  helper.addNumericRefinement('numerical2', '<=', 3);

  var stateFinalWithSpecificAttribute = {
    index: index,
    query: initialState.query,
    facetsRefinements: {facetA: ['a']},
    disjunctiveFacetsRefinements: {facetB: ['d']},
    numericRefinements: {numerical: {'=': [3]}}
  };

  var stateFinalWithoutSpecificAttributes = {
    index: index,
    query: initialState.query,
    facetsRefinements: {facetA: ['a'], facetWeDontCareAbout: ['v']},
    disjunctiveFacetsRefinements: {facetB: ['d']},
    hierarchicalFacetsRefinements: {facetC: ['menu']},
    numericRefinements: {numerical2: {'<=': [3]}, numerical: {'=': [3]}}
  };

  var stateWithHierarchicalAttribute = {
    hierarchicalFacetsRefinements: {facetC: ['menu']}
  };

  t.deepEquals(helper.getState([]), {}, 'if an empty array is passed then we should get an empty object');
  t.deepEquals(
    helper.getState(['index', 'query', 'attribute:facetA', 'attribute:facetB', 'attribute:numerical']),
    stateFinalWithSpecificAttribute,
    '(getState) getState returned value should contain all the required elements');

  t.deepEquals(
    helper.getState(['attribute:facetC']),
    stateWithHierarchicalAttribute,
    '(getState) getState returned value should contain the hierarchical facet');

  t.deepEquals(
    helper.getState(['index', 'query', 'attribute:*']),
    stateFinalWithoutSpecificAttributes,
    '(getState) getState should return all the attributes if *');

  t.end();
});
