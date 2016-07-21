'use strict';

var test = require('tape');
var sinon = require('sinon');
var algoliaSearch = require('algoliasearch');

var algoliasearchHelper = require('../../../index');
var testData = require('../search.testdata');

function middleware1(state) {
  return state.setQuery('Hello');
}
function middleware2(state) {
  return state.setQuery(state.query + ' World!');
}

test('Middlewares: register, apply and unregister', function(t) {
  var helper = algoliasearchHelper(null, null, null);

  var initialState = helper.getState();

  var unregisterMiddleware1 = helper.registerMiddleware(middleware1);
  t.deepEqual(helper._middlewares, [middleware1], 'The first middleware should be registered');

  var unregisterMiddleware2 = helper.registerMiddleware(middleware2);
  t.deepEqual(helper._middlewares, [middleware1, middleware2], 'The second middleware should be registered');

  var state = helper._applyMiddlewares(initialState);
  t.deepEqual(state.query, 'Hello World!', 'Middlewares should be applied in order');

  unregisterMiddleware2();
  t.deepEqual(helper._middlewares, [middleware1], 'The second middleware should be unregistered');

  state = helper._applyMiddlewares(initialState);
  t.deepEqual(state.query, 'Hello', 'Only the first middleware should be applied');

  unregisterMiddleware1();
  t.deepEqual(helper._middlewares, [], 'The first middleware should be unregistered');

  t.equal(helper.getState(), initialState, 'The helper state should not be mutated');

  t.end();
});

test('Middlewares: applied on search', function(t) {
  var client = algoliaSearch('dsf', 'dsfdf');
  var helper = algoliasearchHelper(client, null, null);

  var search = sinon.stub(client, 'search');
  var initialState = helper.getState();

  helper.registerMiddleware(middleware1);
  helper.registerMiddleware(middleware2);

  search.yieldsAsync(null, testData.response);

  helper.once('search', function(searchState) {
    t.equal(searchState.query, 'Hello World!', 'Middlewares should be applied on search');
    t.equal(helper.getState(), initialState, 'Middlewares should not mutate helper state');

    helper.once('result', function(result, resultState) {
      t.equal(resultState.query, 'Hello World!', 'The correct state should be passed to the result event');
      t.equal(helper.getState(), initialState, 'Middlewares should not mutate helper state');

      t.end();
    });
  });

  helper.search();
});

test('Middlewares: applied on searchOnce', function(t) {
  var client = algoliaSearch('dsf', 'dsfdf');
  var helper = algoliasearchHelper(client, null, null);

  var search = sinon.stub(client, 'search');
  var initialState = helper.getState();

  helper.registerMiddleware(middleware2);

  search.returns(Promise.resolve(testData.response));

  helper.searchOnce({query: 'Hello'}).then(function(res) {
    t.equal(res.state.query, 'Hello World!', 'Middlewares should be applied on searchOnce');
    t.equal(helper.getState(), initialState, 'Middlewares should not mutate helper state');

    t.end();
  });
});
