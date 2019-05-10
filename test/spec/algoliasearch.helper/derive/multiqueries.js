'use strict';

var algoliasearchHelper = require('../../../../index.js');

function makeFakeClient(assertions) {
  return {
    search: function() {
      assertions.apply(null, arguments);

      return new Promise(function() {});
    }
  };
}

test('[Derived helper] no derived helpers', function() {
  var client = makeFakeClient(assertions);
  var helper = algoliasearchHelper(client, '');

  helper.search();

  function assertions(requests) {
    expect(requests.length).toBe(1);
  }
});

test('[Derived helper] 1 derived helpers, no modifications', function() {
  var client = makeFakeClient(assertions);
  var helper = algoliasearchHelper(client, '');

  helper.derive(function(state) {
    return state;
  });

  helper.search();

  function assertions(requests) {
    expect(requests.length).toBe(2);
    expect(requests[0]).toEqual(requests[1]);
  }
});

test('[Derived helper] 1 derived helpers, modification', function() {
  var client = makeFakeClient(assertions);
  var helper = algoliasearchHelper(client, '');

  helper.derive(function(state) {
    return state.setQuery('otherQuery');
  });

  helper.search();

  function assertions(requests) {
    expect(requests.length).toBe(2);
    expect(requests[0].params.query).toBeUndefined();
    expect(requests[1].params.query).toBe('otherQuery');

    delete requests[0].params.query;
    delete requests[1].params.query;

    expect(requests[0]).toEqual(requests[1]);
  }
});
