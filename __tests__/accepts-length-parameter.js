'use strict';

// This test ensures that the helper accepts the `length` (offset/length API param) parameter
// At some point we were badly iterating over the SearchParameters instance and failed when
// the `length` parameter was given.

test('helper accepts length parameter', function() {
  expect.assertions(2);

  var algoliasearch = require('algoliasearch');
  var sinon = require('sinon');
  var algoliasearchHelper = require('../index.js');

  var appId = 'accepts-length-parameter-appId';
  var apiKey = 'accepts-length-parameter-apiKey';
  var indexName = 'accepts-length-parameter-indexName';

  var client = algoliasearch(appId, apiKey);
  var helper = algoliasearchHelper(client, indexName, {
    length: 2,
    hitsPerPage: 10
  });

  client.search = sinon.stub().returns(new Promise(function() {}));

  helper.setQuery('a').search();

  var searchParams = client.search.getCall(0).args[0][0].params;

  expect(searchParams.length).toBe(2);
  expect(searchParams.hitsPerPage).toBe(10);
});
