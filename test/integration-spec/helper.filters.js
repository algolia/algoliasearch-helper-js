'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setup;

var algoliasearchHelper = require('../../');

var random = require('lodash/random');


test('[INT][FILTERS] Should retrieve different values for multi facetted records', function(done) {
  var indexName = '_circle-algoliasearch-helper-js-' +
    (process.env.CIRCLE_BUILD_NUM || 'DEV') +
    'helper_refinements' + random(0, 5000);

  setup(indexName, function(client, index) {
    return index.saveObjects([
      {facet: ['f1', 'f2']},
      {facet: ['f1', 'f3']},
      {facet: ['f2', 'f3']}
    ], {autoGenerateObjectIDIfNotExist: true}).wait()
      .then(function() {
        return index.setSettings({
          attributesToIndex: ['facet'],
          attributesForFaceting: ['facet']
        }).wait();
      }).then(function() {
        return client;
      });
  }).then(function(client) {
    var helper = algoliasearchHelper(client, indexName, {
      facets: ['facet']
    });

    var calls = 0;

    helper.on('error', function(err) {
      done.fail(err);
    });

    helper.on('result', function(content) {
      calls++;

      if (calls === 1) {
        expect(content.hits.length).toBe(2);
        expect(content.facets[0].data).toEqual({
          f1: 2,
          f2: 1,
          f3: 1
        });

        helper.addRefine('facet', 'f2').search();
      }

      if (calls === 2) {
        expect(content.hits.length).toBe(1);
        expect(content.facets[0].data).toEqual({
          f1: 1,
          f2: 1
        });

        helper.toggleRefine('facet', 'f3').search();
      }

      if (calls === 3) {
        expect(content.hits.length).toBe(0);
        expect(content.facets[0]).toBe(undefined);

        helper.removeRefine('facet', 'f2').search();
      }

      if (calls === 4) {
        expect(content.hits.length).toBe(1);
        expect(content.facets[0].data).toEqual({
          f1: 1,
          f3: 1
        });

        client.initIndex(indexName).delete();

        if (!process.browser) {
          client.destroy();
        }

        done();
      }
    });

    helper.addRefine('facet', 'f1').search();
  });
});
