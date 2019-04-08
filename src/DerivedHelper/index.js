'use strict';

var mitt = require('../event-emitter');

/**
 * A DerivedHelper is a way to create sub requests to
 * Algolia from a main helper.
 * @class
 * @classdesc The DerivedHelper provides an event based interface for search callbacks:
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 */
function DerivedHelper(mainHelper, fn) {
  this.main = mainHelper;
  this.fn = fn;
  this.lastResults = null;
  this._emitter = mitt();
}

/**
 * Invoke all handlers for the given type.
 * If present, `"*"` handlers are invoked after type-matched handlers.
 *
 * @param {String} type The event type to invoke
 * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
 * @memberOf mitt
 */
DerivedHelper.prototype.emit = function(type, data) {
  this._emitter.emit(type, data);
  return this;
};

/**
 * Register an event handler for the given type.
 *
 * @param  {String} type Type of event to listen for, or `"*"` for all events
 * @param  {Function} handler Function to call in response to given event
 */
DerivedHelper.prototype.on = function(type, cb) {
  this._emitter.on(type, cb);
  return this;
};

/**
 * Register an event handler for the given type one time.
 *
 * @param  {String} type Type of event to listen for, or `"*"` for all events
 * @param  {Function} handler Function to call in response to given event
 */
DerivedHelper.prototype.once = function(type, cb) {
  this._emitter.once(type, cb);
  return this;
};

/**
 * Remove an event handler for the given type.
 *
 * @param  {String} type Type of event to unregister `handler` from, or `"*"`
 * @param  {Function} handler Handler function to remove
 */
DerivedHelper.prototype.off = function(type, cb) {
  this._emitter.off(type, cb);
  return this;
};

/**
 * Remove all event handlers.
 */
DerivedHelper.prototype.removeAllListeners = function() {
  this._emitter.removeAllListeners();
  return this;
};

/**
 * Detach this helper from the main helper
 * @return {undefined}
 * @throws Error if the derived helper is already detached
 */
DerivedHelper.prototype.detach = function() {
  this.removeAllListeners();
  this.main.detachDerivedHelper(this);
};

DerivedHelper.prototype.getModifiedState = function(parameters) {
  return this.fn(parameters);
};

module.exports = DerivedHelper;
