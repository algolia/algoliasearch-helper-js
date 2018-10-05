'use strict';

test('hierarchical facets: combined with a disjunctive facet', function() {
  var algoliasearch = require('algoliasearch');
  var sinon = require('sinon');

  var algoliasearchHelper = require('../../index.js');

  var appId = 'hierarchical-simple-appId';
  var apiKey = 'hierarchical-simple-apiKey';
  var indexName = 'hierarchical-simple-indexName';

  var client = algoliasearch(appId, apiKey);
  var helper = algoliasearchHelper(client, indexName, {
    disjunctiveFacets: ['colors'],
    hierarchicalFacets: [{
      name: 'categories',
      attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2']
    }]
  });

  helper.toggleRefine('categories', 'beers > IPA');
  helper.toggleRefine('colors', 'blue');

  client.search = sinon.stub().returns(new Promise(function() {}));

  helper.setQuery('a').search();

  var disjunctiveFacetsValuesQuery = client.search.getCall(0).args[0][1];

  expect(disjunctiveFacetsValuesQuery.params.facetFilters).toEqual([['categories.lvl1:beers > IPA']]);
});
