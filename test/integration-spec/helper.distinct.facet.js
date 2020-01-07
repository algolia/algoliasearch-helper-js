'use strict';

var utils = require('../integration-utils.js');
var setup = utils.setup;

var algoliasearchHelper = require('../../');

var random = require('lodash/random');

test('[INT][FILTERS] Using distinct should let me retrieve all facet without distinct', function(done) {
  var indexName = '_circle-algoliasearch-helper-js-' +
    (process.env.CIRCLE_BUILD_NUM || 'DEV') +
    'helper_distinct.facet' + random(0, 5000);

  setup(indexName, function(client, index) {
    return index.saveObjects([
      {type: 'shoes', name: 'Adidas Stan Smith', colors: ['blue', 'red']},
      {type: 'shoes', name: 'Converse Chuck Taylor', colors: ['blue', 'green']},
      {type: 'shoes', name: 'Nike Air Jordan', colors: ['gold', 'red']}
    ], {autoGenerateObjectIDIfNotExist: true}).wait()
      .then(function() {
        return index.setSettings({
          attributesToIndex: ['type', 'colors', 'name'],
          attributeForDistinct: 'type',
          attributesForFaceting: ['type', 'colors']
        }).wait();
      }).then(function() {
        return client;
      });
  }).then(function(client) {
    var helper = algoliasearchHelper(client, indexName, {
      facets: ['colors']
    });

    helper.on('error', function(err) {
      done.fail(err);
    });

    helper.on('result', function(content) {
      expect(content.hits.length).toBe(1);
      expect(content.facets[0].data).toEqual({
        blue: 2,
        red: 2,
        gold: 1,
        green: 1
      });

      client.initIndex(indexName).delete();

      if (!process.browser) {
        client.destroy();
      }

      done();
    });

    helper.setQueryParameter('distinct', true).search();
  });
});
