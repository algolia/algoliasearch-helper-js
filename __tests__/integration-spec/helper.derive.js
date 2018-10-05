'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setup;

var algoliasearchHelper = require('../../');

var bind = require('lodash/bind');
var random = require('lodash/random');

if (!utils.shouldRun) {
  test = test.skip;
}
var indexName = '_travis-algoliasearch-helper-js-' +
  (process.env.TRAVIS_BUILD_NUMBER || 'DEV') +
  'helper_searchonce' + random(0, 5000);

test(
  '[INT][DERIVE] Query the same index twice with different query',
  function() {
    expect.assertions(5);

    setup(indexName, function(client, index) {
      return index.addObjects([
        {objectID: '0', content: 'tata'},
        {objectID: '1', content: 'toto'}
      ])
      .then(function(content) {
        return index.waitTask(content.taskID);
      }).then(function() {
        return client;
      });
    }).then(function(client) {
      var helper = algoliasearchHelper(
        client,
        indexName,
        {
          facets: ['f'],
          disjunctiveFacets: ['df'],
          hierarchicalFacets: [{
            name: 'products',
            attributes: ['categories.lvl0', 'categories.lvl1']
          }]
        }
      );
      var helper2 = helper.derive(function(state) {
        return state.setQuery('toto');
      });

      helper.on('result', function(results, state) {
        expect(state.query).toBe('');
        expect(results.hits.length).toBe(2);
      });

      helper2.on('result', function(results, state) {
        expect(state.query).toBe('toto');
        expect(results.hits.length).toBe(1);
        expect(results.hits[0].objectID).toBe('1');
      });

      helper.search();
    }).then(null, bind(t.error, t));
  });
