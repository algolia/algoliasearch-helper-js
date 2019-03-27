'use strict';

var test = require('tape');

test.only('hierarchical facets: facet value called length', function(t) {
  var algoliasearch = require('algoliasearch');

  var sinon = require('sinon');

  var algoliasearchHelper = require('../../../');

  var appId = 'hierarchical-simple-appId';
  var apiKey = 'hierarchical-simple-apiKey';
  var indexName = 'hierarchical-simple-indexName';

  var client = algoliasearch(appId, apiKey);
  var helper = algoliasearchHelper(client, indexName, {
    hierarchicalFacets: [
      {
        name: 'categories',
        attributes: ['categories.lvl0']
      }
    ]
  });

  var algoliaResponse = {
    results: [
      {
        query: 'a',
        index: indexName,
        hits: [{objectID: 'one'}],
        nbHits: 3,
        page: 0,
        nbPages: 1,
        hitsPerPage: 20,
        facets: {
          // value length can cause lodash to turn an object into an array
          'categories.lvl0': {beers: 8, length: 3}
        }
      },
      {
        query: 'a',
        index: indexName,
        hits: [{objectID: 'one'}],
        nbHits: 1,
        page: 0,
        nbPages: 1,
        hitsPerPage: 20,
        facets: {
          // value length can cause lodash to turn an object into an array
          'categories.lvl0': {beers: 30, length: 20}
        }
      }
    ]
  };

  var expectedHelperResponse = [
    {
      name: 'categories',
      count: null,
      isRefined: true,
      path: null,
      data: [
        {name: 'beers', path: 'beers', count: 8, isRefined: false, data: null},
        {name: 'length', path: 'length', count: 3, isRefined: false, data: null}
      ]
    }
  ];

  client.search = sinon.stub().resolves(algoliaResponse);

  helper.search();
  helper.once('result', function(content) {
    t.deepEqual(content.hierarchicalFacets, expectedHelperResponse);
    t.end();
  });
});
