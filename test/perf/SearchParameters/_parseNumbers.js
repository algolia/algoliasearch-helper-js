'use strict';

var _ = require('lodash');

function parseNumbersWithMerge(partialState) {
  var numbers = {};

  var numberKeys = [
    'aroundPrecision',
    'aroundRadius',
    'getRankingInfo',
    'minWordSizefor2Typos',
    'minWordSizefor1Typo',
    'page',
    'maxValuesPerFacet',
    'distinct',
    'minimumAroundRadius',
    'hitsPerPage',
    'minProximity'
  ];

  _.forEach(numberKeys, function(k) {
    var value = partialState[k];
    if (_.isString(value)) numbers[k] = parseFloat(partialState[k]);
  });

  if (partialState.numericRefinements) {
    var numericRefinements = {};
    _.forEach(partialState.numericRefinements, function(operators, attribute) {
      numericRefinements[attribute] = {};
      _.forEach(operators, function(values, operator) {
        var parsedValues = _.map(values, function(v) {
          if (_.isArray(v)) {
            return _.map(v, function(vPrime) {
              if (_.isString(vPrime)) {
                return parseFloat(vPrime);
              }
              return vPrime;
            });
          } else if (_.isString(v)) {
            return parseFloat(v);
          }
          return v;
        });
        numericRefinements[attribute][operator] = parsedValues;
      });
    });
    numbers.numericRefinements = numericRefinements;
  }

  return _.merge({}, partialState, numbers);
}

function parseNumbersWithCloneDeep(partialState) {
  var newState = _.cloneDeep(partialState);

  var numberKeys = [
    'aroundPrecision',
    'aroundRadius',
    'getRankingInfo',
    'minWordSizefor2Typos',
    'minWordSizefor1Typo',
    'page',
    'maxValuesPerFacet',
    'distinct',
    'minimumAroundRadius',
    'hitsPerPage',
    'minProximity'
  ];

  // parse numeric root keys to floats
  newState = _.mapValues(newState, function(value, key) {
    if (!_.includes(numberKeys, key) || !_.isString(value)) {
      return value;
    }
    return parseFloat(value);
  });


  // Parse input to float, act recursively on arrays
  function recurseParseFloat(input) {
    if (_.isArray(input)) {
      return _.map(input, recurseParseFloat);
    }
    return parseFloat(input);
  }

  var numericRefinements = newState.numericRefinements;
  if (numericRefinements) {
    numericRefinements = _.mapValues(numericRefinements, function(refinements) {
      return _.mapValues(refinements, recurseParseFloat);
    });
    newState.numericRefinements = numericRefinements;
  }

  return newState;
}

var partialState = {
  index: 'steamdb',
  query: 'this is really slow',
  facets: [
    'tags',
    'multiplayerCategories',
    'featuresCategories',
    'vrCategories',
    'oslist'
  ],
  disjunctiveFacets: [
    'appType',
    'developer'
  ],
  hierarchicalFacets: [],
  facetsRefinements: {
    multiplayerCategories: [
      '[object Object]'
    ]
  },
  facetsExcludes: {},
  disjunctiveFacetsRefinements: {
    appType: [
      'Game'
    ]
  },
  numericRefinements: {},
  tagRefinements: [],
  hierarchicalFacetsRefinements: {},
  hitsPerPage: 20,
  maxValuesPerFacet: 1000,
  page: 0
};

module.exports = {
  compare: {
    'parseNumbers with merge': function() {
      parseNumbersWithMerge(partialState);
    },
    'parseNumbers with cloneDeep': function() {
      parseNumbersWithCloneDeep(partialState);
    }
  }
};
require('bench').runMain();
