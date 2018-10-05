'use strict';

var algoliasearchHelper = require('../../../index');

var fakeClient = {};

test('setChange should change the current page', function() {
  var helper = algoliasearchHelper(fakeClient, null, null);

  expect(helper.getCurrentPage() === 0).toBeTruthy();
  helper.setCurrentPage(3);
  expect(helper.getCurrentPage() === 3).toBeTruthy();
});

test('nextPage should increment the page by one', function() {
  var helper = algoliasearchHelper(fakeClient, null, null);

  expect(helper.getCurrentPage() === 0).toBeTruthy();
  helper.nextPage();
  helper.nextPage();
  helper.nextPage();
  expect(helper.getCurrentPage() === 3).toBeTruthy();
});

test('previousPage should decrement the current page by one', function() {
  var helper = algoliasearchHelper(fakeClient, null, null);

  expect(helper.getCurrentPage() === 0).toBeTruthy();
  helper.setCurrentPage(3);
  expect(helper.getCurrentPage() === 3).toBeTruthy();
  helper.previousPage();
  expect(helper.getCurrentPage() === 2).toBeTruthy();
});

test('pages should be reset if the mutation might change the number of pages', function() {
  var bind = require('lodash/bind');

  var helper = algoliasearchHelper(fakeClient, '', {
    facets: ['facet1', 'f2'],
    disjunctiveFacets: ['f1']
  });

  function testMutation(tester, text, testFn) {
    helper.setCurrentPage(10);
    expect(helper.getCurrentPage()).toBe(10);
    testFn();
    expect(helper.getCurrentPage()).toBe(0);
  }

  testMutation(t, ' clearRefinements', bind(helper.clearRefinements, helper));
  testMutation(t, ' setQuery', bind(helper.setQuery, helper, 'query'));
  testMutation(t, ' addNumericRefinement', bind(helper.addNumericRefinement, helper, 'facet', '>', '2'));
  testMutation(t, ' removeNumericRefinement', bind(helper.removeNumericRefinement, helper, 'facet', '>'));

  testMutation(t, ' addExclude', bind(helper.addExclude, helper, 'facet1', 'val2'));
  testMutation(t, ' removeExclude', bind(helper.removeExclude, helper, 'facet1', 'val2'));

  testMutation(t, ' addRefine', bind(helper.addRefine, helper, 'f2', 'val'));
  testMutation(t, ' removeRefine', bind(helper.removeRefine, helper, 'f2', 'val'));

  testMutation(t, ' addDisjunctiveRefine', bind(helper.addDisjunctiveRefine, helper, 'f1', 'val'));
  testMutation(t, ' removeDisjunctiveRefine', bind(helper.removeDisjunctiveRefine, helper, 'f1', 'val'));

  testMutation(t, ' toggleRefine', bind(helper.toggleRefine, helper, 'f1', 'v1'));
  testMutation(t, ' toggleExclude', bind(helper.toggleExclude, helper, 'facet1', '55'));
});
