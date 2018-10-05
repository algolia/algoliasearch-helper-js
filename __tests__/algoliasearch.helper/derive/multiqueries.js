'use strict';

var algoliasearchHelper = require('../../../index.js');

test('[Derivated helper] no derivatives', function() {
  expect.assertions(1);
  var client = {
    search: searchTest
  };
  var helper = algoliasearchHelper(client, '');
  helper.search();

  function searchTest(requests) {
    expect(requests.length).toBe(1);

    return new Promise(function() {});
  }
});

test('[Derivated helper] 1 derivatives, no modifications', function() {
  expect.assertions(2);
  var client = {
    search: searchTest
  };
  var helper = algoliasearchHelper(client, '');
  helper.derive(function(s) { return s; });
  helper.search();

  function searchTest(requests) {
    expect(requests.length).toBe(2);
    expect(requests[0]).toEqual(requests[1]);

    return new Promise(function() {});
  }
});

test('[Derivated helper] no derivatives, modification', function() {
  expect.assertions(4);
  var client = {
    search: searchTest
  };
  var helper = algoliasearchHelper(client, '');
  helper.derive(function(s) { return s.setQuery('otherQuery'); });
  helper.search();

  function searchTest(requests) {
    expect(requests.length).toBe(2);
    expect(requests[0].params.query).toBe('');
    expect(requests[1].params.query).toBe('otherQuery');

    delete requests[0].params.query;
    delete requests[1].params.query;

    expect(requests[0]).toEqual(requests[1]);

    return new Promise(function() {});
  }
});
