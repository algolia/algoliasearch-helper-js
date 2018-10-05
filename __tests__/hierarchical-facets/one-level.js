'use strict';

test('hierarchical facets: only one level deep', function(done) {
  var algoliasearch = require('algoliasearch');
  var sinon = require('sinon');

  var algoliasearchHelper = require('../../index.js');

  var appId = 'hierarchical-simple-appId';
  var apiKey = 'hierarchical-simple-apiKey';
  var indexName = 'hierarchical-simple-indexName';

  var client = algoliasearch(appId, apiKey);
  var helper = algoliasearchHelper(client, indexName, {
    hierarchicalFacets: [{
      name: 'categories',
      attributes: ['categories.lvl0']
    }]
  });

  helper.toggleRefine('categories', 'beers');

  var algoliaResponse = {
    'results': [{
      'query': 'a',
      'index': indexName,
      'hits': [{'objectID': 'one'}, {'objectID': 'two'}],
      'nbHits': 2,
      'page': 0,
      'nbPages': 1,
      'hitsPerPage': 20,
      'facets': {
        'categories.lvl0': {'beers': 2}
      }
    }, {
      'query': 'a',
      'index': indexName,
      'hits': [{'objectID': 'one'}],
      'nbHits': 1,
      'page': 0,
      'nbPages': 1,
      'hitsPerPage': 1,
      'facets': {
        'categories.lvl0': {'beers': 2, 'fruits': 3}
      }
    }]
  };

  var expectedHelperResponse = [{
    'name': 'categories',
    'count': null,
    'isRefined': true,
    'path': null,
    'data': [{
      'name': 'beers',
      'path': 'beers',
      'count': 2,
      'isRefined': true,
      'data': null
    }, {
      'name': 'fruits',
      'path': 'fruits',
      'count': 3,
      'isRefined': false,
      'data': null
    }]
  }];

  client.search = sinon
    .stub()
    .resolves(algoliaResponse);

  helper.setQuery('a').search();
  helper.once('result', function(content) {
    var call = client.search.getCall(0);
    var queries = call.args[0];
    var hitsQuery = queries[0];
    var parentValuesQuery = queries[1];

    expect(queries.length).toBe(2);
    expect(client.search.calledOnce).toBeTruthy();
    expect(hitsQuery.params.facets).toEqual(['categories.lvl0']);
    expect(hitsQuery.params.facetFilters).toEqual([['categories.lvl0:beers']]);
    expect(parentValuesQuery.params.facets).toEqual(['categories.lvl0']);
    expect(parentValuesQuery.params.facetFilters).toBe(undefined);
    expect(content.hierarchicalFacets).toEqual(expectedHelperResponse);
    done();
  });
});
