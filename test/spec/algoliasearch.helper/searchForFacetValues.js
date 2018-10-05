'use strict';

var algoliasearchHelper = require('../../../index');

test('searchForFacetValues calls the client method over the index method', function(done) {
  expect.assertions(2);

  var indexSearchForFacetValuesCalled = 0;
  var clientSearchForFacetValuesCalled = 0;

  var fakeClient = {
    searchForFacetValues: function() {
      clientSearchForFacetValuesCalled++;
      return Promise.resolve([{}]);
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
    expect(clientSearchForFacetValuesCalled).toBe(1);
    expect(indexSearchForFacetValuesCalled).toBe(0);

    done();
  });
});

test('searchForFacetValues calls the index method if no client method', function(done) {
  expect.assertions(1);

  var indexSearchForFacetValuesCalled = 0;

  var fakeClient = {
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
    expect(indexSearchForFacetValuesCalled).toBe(1);
    done();
  });
});

test('searchForFacetValues resolve with the correct response from client', function(done) {
  expect.assertions(3);

  var fakeClient = {
    addAlgoliaAgent: function() {},
    searchForFacetValues: function() {
      return Promise.resolve([
        {
          exhaustiveFacetsCount: true,
          facetHits: [],
          processingTimeMS: 3
        }
      ]);
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index');

  helper.searchForFacetValues('facet', 'query', 1).then(function(content) {
    expect(content.exhaustiveFacetsCount).toBe(true);
    expect(content.facetHits.length).toBe(0);
    expect(content.processingTimeMS).toBe(3);

    done();
  });
});

test('searchForFacetValues resolve with the correct response from initIndex', function(done) {
  expect.assertions(3);

  var fakeClient = {
    addAlgoliaAgent: function() {},
    initIndex: function() {
      return {
        searchForFacetValues: function() {
          return Promise.resolve({
            exhaustiveFacetsCount: true,
            facetHits: [],
            processingTimeMS: 3
          });
        }
      };
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index');

  helper.searchForFacetValues('facet', 'query', 1).then(function(content) {
    expect(content.exhaustiveFacetsCount).toBe(true);
    expect(content.facetHits.length).toBe(0);
    expect(content.processingTimeMS).toBe(3);

    done();
  });
});

test('index.searchForFacetValues should search for facetValues with the current state', function() {
  var lastParameters = null;
  var fakeClient = {
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

  expect(lastParameters[0].query).toBe('iphone');
  expect(lastParameters[0].facetQuery).toBe('query');
  expect(lastParameters[0].facetName).toBe('facet');
  expect(lastParameters[0].highlightPreTag).toBe('HIGHLIGHT>');
  expect(lastParameters[0].highlightPostTag).toBe('<HIGHLIGHT');
});

test('index.searchForFacetValues can override the current search state', function() {
  var lastParameters = null;
  var fakeClient = {
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

  expect(lastParameters[0].hasOwnProperty('query')).toBeFalsy();
  expect(lastParameters[0].facetQuery).toBe('query');
  expect(lastParameters[0].facetName).toBe('facet');
  expect(lastParameters[0].highlightPreTag).toBe('highlightTag');
  expect(lastParameters[0].highlightPostTag).toBe('<HIGHLIGHT');
});

test('client.searchForFacetValues should search for facetValues with the current state', function() {
  var lastParameters = null;
  var fakeClient = {
    searchForFacetValues: function() {
      lastParameters = arguments[0];
      return Promise.resolve({});
    }
  };

  var helper = algoliasearchHelper(fakeClient, 'index', {
    highlightPreTag: 'HIGHLIGHT>',
    highlightPostTag: '<HIGHLIGHT',
    query: 'iphone'
  });

  helper.searchForFacetValues('facet', 'query', 75);

  expect(lastParameters[0].indexName).toBe('index');
  expect(lastParameters[0].params.query).toBe('iphone');
  expect(lastParameters[0].params.facetQuery).toBe('query');
  expect(lastParameters[0].params.facetName).toBe('facet');
  expect(lastParameters[0].params.highlightPreTag).toBe('HIGHLIGHT>');
  expect(lastParameters[0].params.highlightPostTag).toBe('<HIGHLIGHT');
});

test('client.searchForFacetValues can override the current search state', function() {
  var lastParameters = null;
  var fakeClient = {
    searchForFacetValues: function() {
      lastParameters = arguments[0];
      return Promise.resolve({});
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

  expect(lastParameters[0].indexName).toBe('index');
  expect(lastParameters[0].params.hasOwnProperty('query')).toBeFalsy();
  expect(lastParameters[0].params.facetQuery).toBe('query');
  expect(lastParameters[0].params.facetName).toBe('facet');
  expect(lastParameters[0].params.highlightPreTag).toBe('highlightTag');
  expect(lastParameters[0].params.highlightPostTag).toBe('<HIGHLIGHT');
});
