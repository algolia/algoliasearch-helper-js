'use strict';

var test = require('tape');
var algoliaSearch = require('algoliasearch');

var algoliasearchHelper = require('../../../index');

test('When searchOnce with callback, isSearchPending is true', function(t) {
  var testData = require('../search.testdata')();
  var client = algoliaSearch('dsf', 'dsfdf');

  var triggerCb;
  client.search = function(qs, cb) {
    triggerCb = function() { cb(null, testData.response); };
  };

  var helper = algoliasearchHelper(client, 'test_hotels-node');
  var countNoMoreSearch = 0;
  helper.on('noMoreSearch', function() {
    countNoMoreSearch += 1;
  });

  t.equal(helper.isSearchPending(), false, 'before searchOnce');

  helper.searchOnce(helper.state, function() {
    t.equal(helper.isSearchPending(), false, 'after searchOnce');
    t.equal(countNoMoreSearch, 1, 'No more search should have been called once after search results');
    t.end();
  });

  t.equal(helper.isSearchPending(), true, 'during searchOnce');
  t.equal(countNoMoreSearch, 0, 'No more search should not have been called yet');

  triggerCb();
});

test('When searchOnce with promises, isSearchPending is true', function(t) {
  var testData = require('../search.testdata')();
  var client = algoliaSearch('dsf', 'dsfdf');

  var triggerCb;
  client.search = function() {
    return new Promise(function(done) {
      triggerCb = function() { done(testData.response); };
    });
  };

  var helper = algoliasearchHelper(client, 'test_hotels-node');
  var countNoMoreSearch = 0;
  helper.on('noMoreSearch', function() {
    countNoMoreSearch += 1;
  });

  t.equal(helper.isSearchPending(), false, 'before searchOnce');

  helper.searchOnce(helper.state).then(function() {
    t.equal(helper.isSearchPending(), false, 'after searchOnce');
    t.equal(countNoMoreSearch, 1, 'No more search should have been called once after search results');
    t.end();
  });

  t.equal(helper.isSearchPending(), true, 'during searchOnce');
  t.equal(countNoMoreSearch, 0, 'No more search should not have been called yet');

  triggerCb();
});

test('When searchForFacetValues, isSearchPending is true', function(t) {
  var testData = require('../search.testdata')();
  var client = algoliaSearch('dsf', 'dsfdf');

  var triggerCb;
  client.initIndex = function() {
    return {
      searchForFacetValues: function() {
        return new Promise(function(done) {
          triggerCb = function() { done(testData.response); };
        });
      }
    };
  };

  var helper = algoliasearchHelper(client, 'test_hotels-node');
  var countNoMoreSearch = 0;
  helper.on('noMoreSearch', function() {
    countNoMoreSearch += 1;
  });

  t.equal(helper.isSearchPending(), false, 'before searchForFacetValues');

  helper.searchForFacetValues('').then(function() {
    t.equal(helper.isSearchPending(), false, 'after searchForFacetValues');
    t.equal(countNoMoreSearch, 1, 'No more search should have been called once after search results');
    t.end();
  });

  t.equal(helper.isSearchPending(), true, 'during searchForFacetValues');
  t.equal(countNoMoreSearch, 0, 'No more search should not have been called yet');

  triggerCb();
});

test('When helper.search(), isSearchPending is true', function(t) {
  var testData = require('../search.testdata')();
  var client = algoliaSearch('dsf', 'dsfdf');

  var triggerCb;
  client.search = function(qs, cb) {
    triggerCb = function() { cb(null, testData.response); };
  };

  var helper = algoliasearchHelper(client, 'test_hotels-node');
  var countNoMoreSearch = 0;
  helper.on('noMoreSearch', function() {
    countNoMoreSearch += 1;
  });

  t.equal(helper.isSearchPending(), false, 'before helper.search()');

  helper.on('result', function() {
    t.equal(helper.isSearchPending(), false, 'after helper.search()');
    t.equal(countNoMoreSearch, 1, 'No more search should have been called once after search results');
    t.end();
  });

  helper.search();

  t.equal(helper.isSearchPending(), true, 'during helper.search()');
  t.equal(countNoMoreSearch, 0, 'No more search should not have be called yet');

  triggerCb();
});

test('When helper.search() and one request is discarded, isSearchPending is true unless all come back', function(t) {
  var testData = require('../search.testdata');
  var client = algoliaSearch('dsf', 'dsfdf');

  var triggerCbs = [];
  client.search = function(qs, cb) {
    triggerCbs.push(function() { cb(null, testData().response); });
  };

  var helper = algoliasearchHelper(client, 'test_hotels-node');
  var countNoMoreSearch = 0;
  helper.on('noMoreSearch', function() {
    countNoMoreSearch += 1;
  });

  t.equal(helper.isSearchPending(), false, 'before helper.search()');

  helper.search();
  helper.search();
  helper.search();

  // intermediary result handler
  helper.once('result', function() {
    t.equal(helper.isSearchPending(), true, 'second request come back first, but the first is still ongoing');
    t.equal(countNoMoreSearch, 0, 'A search is still pending, which means that it should not have triggered the noMoreSearch event');
  });

  // The second search returns from algolia -> discards the first one
  triggerCbs[1]();

  // Final result handler
  helper.once('result', function() {
    t.equal(helper.isSearchPending(), true, 'second request come back first, but searchOnce is still ongoing');
    t.equal(countNoMoreSearch, 0, 'A search is still pending, which means that it should not have triggered the noMoreSearch event');
  });

  helper.searchOnce({}, function() {
    t.equal(helper.isSearchPending(), false, 'The last callback triggered is the searchOnce');
    t.equal(countNoMoreSearch, 1, 'This the last query');
  });

  // The third search returns from Algolia
  triggerCbs[2]();
  // The searchOnce should not be impacted
  triggerCbs[3]();
  triggerCbs[0]();
  // this will be ignored and it won't change anything

  setTimeout(function() {
    t.equal(helper.isSearchPending(), false, 'after helper.search()');
    t.equal(countNoMoreSearch, 1, 'No more search should have been called once after search results');
    t.end();
  }, 0);
});
