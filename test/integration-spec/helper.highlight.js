'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setup;

var algoliasearchHelper = require('../../');

var random = require('lodash/random');


test('[INT][HIGHLIGHT] The highlight should be consistent with the parameters', function(done) {
  var indexName = '_circle-algoliasearch-helper-js-' +
    (process.env.CIRCLE_BUILD_NUM || 'DEV') +
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
    helper.on('result', function(event) {
      calls++;
      if (calls === 1) {
        expect(event.results.hits[0]._highlightResult.facet[0].value).toBe('<em>f1</em>');
        expect(event.results.hits[1]._highlightResult.facet[0].value).toBe('<em>f1</em>');
        helper.setQueryParameter('highlightPostTag', '</strong>')
          .setQueryParameter('highlightPreTag', '<strong>')
          .search();
      } else if (calls === 2) {
        expect(event.results.hits[0]._highlightResult.facet[0].value).toBe('<strong>f1</strong>');
        expect(event.results.hits[1]._highlightResult.facet[0].value).toBe('<strong>f1</strong>');
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
