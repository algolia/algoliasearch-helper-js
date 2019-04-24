'use strict';

// This test ensures that the helper accepts the `length` (offset/length API param) parameter
// At some point we were badly iterating over the SearchParameters instance and failed when
// the `length` parameter was given.

var algoliasearchHelper = require('../../');

test('helper accepts length parameter', function() {
  var fakeClient = {
    search: jest.fn(function() {
      return new Promise(function() {});
    })
  };

  var helper = algoliasearchHelper(fakeClient, 'index', {
    length: 2,
    hitsPerPage: 10
  });

  helper.setQuery('a').search();

  var lastArguments = fakeClient.search.mock.calls[0][0][0];

  expect(lastArguments.params.length).toBe(2);
  expect(lastArguments.params.hitsPerPage).toBe(10);
});
