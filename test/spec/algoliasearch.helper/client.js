'use strict';

var test = require('tape');
var sinon = require('sinon');
var algoliaSearchHelper = require('../../../index.js');
var version = require('../../../src/version');
var algoliasearch = require('algoliasearch');

function makeFakeClient() {
  var client = algoliasearch('what', 'wait', {});
  client.search = sinon.spy();
  return client;
}

test('setting the agent once', function(t) {
  var client = algoliasearch('what', 'wait', {});
  var originalUA = client._ua;
  algoliaSearchHelper(client, 'IndexName', {});
  algoliaSearchHelper(client, 'IndexName2', {});

  t.equal(client._ua, originalUA + ';JS Helper ' + version);

  t.end();
});

test('getClient / setClient', function(t) {
  var client0 = makeFakeClient();
  var originalUA = client0._ua;
  var helper = algoliaSearchHelper(client0, 'IndexName', {});

  t.equal(client0.search.callCount, 0, 'before any search the client should not have been called');
  helper.search();
  t.equal(client0.search.callCount, 1, 'after a single search, the client must have been strictly one time');

  t.equal(helper.getClient(), client0, 'getClient should return the instance defined with the Helper factory');

  t.equal(client0._ua, originalUA + ';JS Helper ' + version, 'sets the helper agent, client 0');

  var client1 = makeFakeClient();
  helper.setClient(client1);

  t.equal(helper.getClient(), client1);

  t.equal(client1.search.callCount, 0, 'the new client should not have been called before any search');
  helper.search();
  t.equal(client1.search.callCount, 1, 'the new client should have been called');
  t.equal(client0.search.callCount, 1, 'the old client should not have been called if it is not set anymore');

  t.equal(client1._ua, originalUA + ';JS Helper ' + version, 'sets the helper agent, client 1');

  helper.setClient(client1);
  t.equal(client1._ua, originalUA + ';JS Helper ' + version, 'does not set the helper agent twice, client 1');

  t.end();
});
