'use strict';

var algoliasearchHelper = require('../../../index');

var fakeClient = {};

test('setChange should change the current state', function() {
  var helper = algoliasearchHelper(fakeClient, null, null);
  var changed = false;

  helper.on('change', function() {
    changed = true;
  });

  expect(helper.getPage()).toBeUndefined();
  expect(changed).toBe(false);
  helper.setQueryParameter('page', 22);
  expect(helper.getPage()).toBe(22);
  expect(changed).toBe(true);
});

test('setChange should not change the current state: no real modification', function() {
  var helper = algoliasearchHelper(fakeClient, null, {page: 0});
  var changed = false;
  var initialState = helper.state;

  helper.on('change', function() {
    changed = true;
  });

  expect(helper.getPage()).toBe(0);
  expect(changed).toBe(false);
  helper.setQueryParameter('page', 0);
  expect(helper.getPage()).toBe(0);
  expect(changed).toBe(false);
  expect(helper.state).toBe(initialState);
});

test('setChange should ignore invalid userToken', function() {
  var helper = algoliasearchHelper(fakeClient, null, {});
  helper.setQueryParameter('userToken', null);
  expect(helper.state.userToken).toBeUndefined();

  helper.setQueryParameter('userToken', '');
  expect(helper.state.userToken).toBeUndefined();

  helper.setQueryParameter('userToken', 'my invalid token!');
  expect(helper.state.userToken).toBeUndefined();
});

test('setChange should preserve valid userToken', function() {
  var helper = algoliasearchHelper(fakeClient, null, {userToken: 'abc'});
  helper.setQueryParameter('userToken', null);
  expect(helper.state.userToken).toBe('abc');

  helper.setQueryParameter('userToken', '');
  expect(helper.state.userToken).toBe('abc');

  helper.setQueryParameter('userToken', 'my invalid token!');
  expect(helper.state.userToken).toBe('abc');
});

