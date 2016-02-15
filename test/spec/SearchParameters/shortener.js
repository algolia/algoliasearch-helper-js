'use strict';

var test = require('tape');
var SearchParameters = require('../../../src/SearchParameters');
var keys = require('lodash/object/keys');
var map = require('lodash/collection/map');
var uniq = require('lodash/array/uniq');
var shortener = require('../../../src/SearchParameters/shortener');

test('Should encode all the properties of AlgoliaSearchHelper properly', function(t) {
  var ks = keys(new SearchParameters());
  var encodedKs = uniq(map(ks, shortener.encode));
  t.equals(
    encodedKs.length,
    ks.length,
    'Once all the properties converted and dedup, their length should be equal'
  );
  var decodedKs = map(encodedKs, shortener.decode);
  t.deepEquals(
    decodedKs,
    ks,
    'Encode then decode should be the initial value'
  );
  t.end();
});

test('Should be able to set a key to an another short value', function(t) {
  var old = shortener.ENCODED_PARAMETERS[0];
  var key = shortener.decode(old);
  var now = 'abc';
  var oldLength = shortener.ENCODED_PARAMETERS.length;

  shortener.set(key, now);

  t.equals(
    shortener.encode(key),
    now,
    'Encoding the key should return the new one'
  );
  t.equals(
    shortener.decode(now),
    key,
    'Decoding the new one should return the key'
  );
  t.equals(
    shortener.decode(old),
    undefined,
    'Decoding the old one should return undefined'
  );
  t.equals(
    shortener.ENCODED_PARAMETERS.length,
    oldLength,
    'ENCODED_PARAMETERS should have the same size'
  );
  t.equals(
    shortener.ENCODED_PARAMETERS[0],
    now,
    'ENCODED_PARAMETERS\'s first value should have been replaced'
  );
  t.end();
});

test('Should be able to add a new key', function(t) {
  var key = 'thisKeyShouldNeverBePresentInTheCode';
  var now = 'tKSNBPITC';
  var oldLength = shortener.ENCODED_PARAMETERS.length;

  shortener.set(key, now);

  t.equals(
    shortener.encode(key),
    now,
    'Encoding the key should return the new one'
  );
  t.equals(
    shortener.decode(now),
    key,
    'Decoding the new one should return the key'
  );
  t.equals(
    shortener.ENCODED_PARAMETERS.length,
    oldLength + 1,
    'ENCODED_PARAMETERS should have grown'
  );
  t.equals(
    shortener.ENCODED_PARAMETERS[oldLength],
    now,
    'ENCODED_PARAMETERS\'s last value should be the new one'
  );
  t.end();
});
