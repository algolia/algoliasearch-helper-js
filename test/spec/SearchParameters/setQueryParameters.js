'use strict';

var forOwn = require('lodash/forOwn');
var SearchParameters = require('../../../src/SearchParameters');

test('setQueryParameters should return the same instance if the options is falsey', function() {
  var originalSP = new SearchParameters({
    facets: ['a', 'b'],
    ignorePlurals: false,
    attributesToHighlight: ''
  });

  expect(originalSP).toBe(originalSP.setQueryParameters());
  expect(originalSP).toBe(originalSP.setQueryParameters(null));
  expect(originalSP).toBe(originalSP.setQueryParameters(undefined));
});

test('setQueryParameters should be able to mix an actual state with a new set of parameters', function() {
  var originalSP = new SearchParameters({
    facets: ['a', 'b'],
    ignorePlurals: false,
    attributesToHighlight: ''
  });

  var params = {
    facets: ['a', 'c'],
    attributesToHighlight: ['city', 'country'],
    replaceSynonymsInHighlight: true
  };
  var newSP = originalSP.setQueryParameters(params);

  expect(newSP.facets).toEqual(params.facets);
  expect(newSP.attributesToHighlight).toEqual(newSP.attributesToHighlight);
  expect(newSP.replaceSynonymsInHighlight).toBe(newSP.replaceSynonymsInHighlight);
  expect(newSP.ignorePlurals).toBe(originalSP.ignorePlurals);
});

test('setQueryParameters should add unknown properties', function() {
  var state0 = new SearchParameters({
    facets: ['a', 'b'],
    ignorePlurals: false,
    attributesToHighlight: ''
  });

  var params = {
    unknow1: ['a', 'c'],
    facet: ['city', 'country']
  };

  var state1 = state0.setQueryParameters(params);

  forOwn(params, function(v, k) {
    expect(state1[k]).toEqual(v);
  });
});

test('setQueryParameters should ignore undefined parameters without previous values', function() {
  var state0 = new SearchParameters({
    aroundLatLng: '10,12'
  });

  var state1 = state0.setQueryParameters({
    query: undefined,
    page: undefined
  });

  expect(state1).not.toHaveProperty('query');
  expect(state1).not.toHaveProperty('page');
});

test('setQueryParameters should omit defined parameters with next values of undefined', function() {
  var state0 = new SearchParameters({
    aroundLatLng: '10,12',
    query: 'Apple',
    page: 5
  });

  var state1 = state0.setQueryParameters({
    query: undefined,
    page: undefined
  });

  expect(state1).not.toHaveProperty('query');
  expect(state1).not.toHaveProperty('page');
});
