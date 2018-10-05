'use strict';

var sinon = require('sinon');
var algoliaSearchHelper = require('../../../index.js');
var version = require('../../../src/version');
var algoliasearch = require('algoliasearch');

function makeFakeClient() {
  var client = algoliasearch('what', 'wait', {});
  client.search = sinon.stub().returns(new Promise(function() {}));
  return client;
}

test("client without addAlgoliaAgent() doesn't throw on instanciation", function() {
  var client = {};

  expect(function() {
    algoliaSearchHelper(client);
  }).not.toThrow();
});

test('addAlgoliaAgent gets called if exists', function() {
  var client = {
    addAlgoliaAgent: sinon.stub()
  };

  expect(client.addAlgoliaAgent.called).toBeFalsy();

  algoliaSearchHelper(client);

  expect(client.addAlgoliaAgent.called).toBeTruthy();
});

test("client without clearCache() doesn't throw when clearing cache", function() {
  var client = {};
  var helper = algoliaSearchHelper(client);

  expect(function() {
    helper.clearCache();
  }).not.toThrow();
});

test('clearCache gets called if exists', function() {
  var client = {
    clearCache: sinon.stub()
  };
  var helper = algoliaSearchHelper(client);

  expect(client.clearCache.called).toBeFalsy();

  helper.clearCache();

  expect(client.clearCache.called).toBeTruthy();
});

test('setting the agent once', function() {
  var client = algoliasearch('what', 'wait', {});
  var originalUA = client._ua;
  algoliaSearchHelper(client, 'IndexName', {});
  algoliaSearchHelper(client, 'IndexName2', {});

  expect(client._ua).toBe(originalUA + ';JS Helper ' + version);
});

test('getClient / setClient', function() {
  var client0 = makeFakeClient();
  var originalUA = client0._ua;
  var helper = algoliaSearchHelper(client0, 'IndexName', {});

  expect(client0.search.callCount).toBe(0);
  helper.search();
  expect(client0.search.callCount).toBe(1);

  expect(helper.getClient()).toBe(client0);

  expect(client0._ua).toBe(originalUA + ';JS Helper ' + version);

  var client1 = makeFakeClient();
  helper.setClient(client1);

  expect(helper.getClient()).toBe(client1);

  expect(client1.search.callCount).toBe(0);
  helper.search();
  expect(client1.search.callCount).toBe(1);
  expect(client0.search.callCount).toBe(1);

  expect(client1._ua).toBe(originalUA + ';JS Helper ' + version);

  helper.setClient(client1);
  expect(client1._ua).toBe(originalUA + ';JS Helper ' + version);
});

test('initial client === getClient', function() {
  expect.assertions(1);
  var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
  var helper = algoliaSearchHelper(client, 'instant_search', {});
  helper.setQuery('blah').search();
  expect(client).toBe(helper.getClient());
});
