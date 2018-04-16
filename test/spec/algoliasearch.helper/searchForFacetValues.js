'use strict';

var test = require('tape');

var algoliasearchHelper = require('../../../index');

test('searchForFacetValues should search for facetValues with the current state', function(t) {
  var lastParameters = null;
  var fakeClient = {
    addAlgoliaAgent: function() {},
    initIndex: function() {
      return {
        searchForFacetValues: function() {
          lastParameters = arguments;
          return Promise.resolve({
          });
        }
      };
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index', {
    highlightPreTag: 'HIGHLIGHT>',
    highlightPostTag: '<HIGHLIGHT',
    query: 'iphone'
  });

  helper.searchForFacetValues('facet', 'query', 75);

  t.equal(lastParameters[0].query, 'iphone');
  t.equal(lastParameters[0].facetQuery, 'query');
  t.equal(lastParameters[0].facetName, 'facet');
  t.equal(lastParameters[0].highlightPreTag, 'HIGHLIGHT>');
  t.equal(lastParameters[0].highlightPostTag, '<HIGHLIGHT');

  t.end();
});

test('searchForFacetValues can override the current search state', function(t) {
  var lastParameters = null;
  var fakeClient = {
    addAlgoliaAgent: function() {},
    initIndex: function() {
      return {
        searchForFacetValues: function() {
          lastParameters = arguments;
          return Promise.resolve({
          });
        }
      };
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index', {
    highlightPreTag: 'HIGHLIGHT>',
    highlightPostTag: '<HIGHLIGHT',
    query: 'iphone'
  });

  helper.searchForFacetValues('facet', 'query', 75, {
    query: undefined,
    highlightPreTag: 'highlightTag'
  });

  t.notOk(lastParameters[0].hasOwnProperty('query'));
  t.equal(lastParameters[0].facetQuery, 'query');
  t.equal(lastParameters[0].facetName, 'facet');
  t.equal(lastParameters[0].highlightPreTag, 'highlightTag');
  t.equal(lastParameters[0].highlightPostTag, '<HIGHLIGHT');

  t.end();
});

test('searchForFacetValues calls the client method over the initIndex method', function(t) {
  t.plan(2);

  var indexSearchForFacetValuesCalled = 0;
  var clientSearchForFacetValuesCalled = 0;

  var fakeClient = {
    addAlgoliaAgent: function() {},
    searchForFacetValues: function() {
      clientSearchForFacetValuesCalled++;
      return Promise.resolve({});
    },
    initIndex: function() {
      return {
        searchForFacetValues: function() {
          indexSearchForFacetValuesCalled++;
          return Promise.resolve({});
        }
      };
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index');

  helper.searchForFacetValues('facet', 'query', 1).then(function() {
    t.equal(clientSearchForFacetValuesCalled, 1, 'client called');
    t.equal(indexSearchForFacetValuesCalled, 0, 'index not called');

    t.end();
  });
});

test('searchForFacetValues calls the initIndex method if no client method', function(t) {
  t.plan(1);

  var indexSearchForFacetValuesCalled = 0;

  var fakeClient = {
    addAlgoliaAgent: function() {},
    initIndex: function() {
      return {
        searchForFacetValues: function() {
          indexSearchForFacetValuesCalled++;
          return Promise.resolve({});
        }
      };
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index');

  helper.searchForFacetValues('facet', 'query', 1).then(function() {
    t.equal(indexSearchForFacetValuesCalled, 1);
    t.end();
  });
});
