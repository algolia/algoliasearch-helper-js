'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setup;

var algoliasearchHelper = utils.isCIBrowser ? window.algoliasearchHelper : require('../../');

var random = require('lodash/random');

if (!utils.shouldRun) {
  test = test.skip;
}

test('[INT][HIGHLIGHT] The highlight should be consistent with the parameters', function(done) {
  var indexName = '_travis-algoliasearch-helper-js-' +
    (process.env.TRAVIS_BUILD_NUMBER || 'DEV') +
    'helper_highlight' + random(0, 5000);

  setup(indexName, function(client, index) {
    return index.addObjects([
      {facet: ['f1', 'f2']},
      {facet: ['f1', 'f3']},
      {facet: ['f2', 'f3']}
    ])
      .then(function() {
        return index.setSettings({
          attributesToIndex: ['facet'],
          attributesForFaceting: ['facet']
        });
      })
      .then(function(content) {
        return index.waitTask(content.taskID);
      }).then(function() {
        return client;
      });
  }).then(function(client) {
    var helper = algoliasearchHelper(client, indexName, {
      attributesToHighlight: ['facet'],
      facets: ['facet']
    });

    var calls = 0;
    helper.on('result', function(content) {
      calls++;
      if (calls === 1) {
        expect(content.hits[0]._highlightResult.facet[0].value).toBe('<em>f1</em>');
        expect(content.hits[1]._highlightResult.facet[0].value).toBe('<em>f1</em>');
        helper.setQueryParameter('highlightPostTag', '</strong>')
          .setQueryParameter('highlightPreTag', '<strong>')
          .search();
      } else if (calls === 2) {
        expect(content.hits[0]._highlightResult.facet[0].value).toBe('<strong>f1</strong>');
        expect(content.hits[1]._highlightResult.facet[0].value).toBe('<strong>f1</strong>');
        client.deleteIndex(indexName);
        if (!process.browser) {
          client.destroy();
        }
        done();
      }
    });

    helper.setQuery('f1').search();
  });
});
