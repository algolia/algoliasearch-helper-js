'use strict';

module.exports = mitt;

/**
 * Remove an element from an array, if it occurs
 *
 * @param {Array<T>} array list to modify
 * @param {T} element element to find and remove from the array
 */
function removeInPlace(array, element) {
  array.splice(array.indexOf(element) >>> 0, 1);
}

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt() {
  var listeners = Object.create(null);
  var onceListeners = Object.create(null);

  return {
    /**
     * Register an event handler for the given type.
     *
     * @param  {String} type  Type of event to listen for for all events
     * @param  {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on: function on(type, handler) {
      (listeners[type] || (listeners[type] = [])).push(handler);
    },

    /**
     * Register an event handler for the given type one time.
     *
     * @param  {String} type  Type of event to listen for for all events
     * @param  {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    once: function once(type, handler) {
      (onceListeners[type] || (onceListeners[type] = [])).push(handler);
    },

    /**
     * Remove an event handler for the given type.
     *
     * @param  {String} type  Type of event to unregister `handler` from
     * @param  {Function} handler Handler function to remove
     * @memberOf mitt
     */
    off: function off(type, handler) {
      if (listeners[type]) {
        removeInPlace(listeners[type], handler);
      }
    },

    /**
     * Invoke all handlers for the given type.
     *
     * @param {String} type  The event type to invoke
     * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit: function emit(type, evt) {
      (listeners[type] || []).forEach(function(handler) {
        handler(evt);
      });

      (onceListeners[type] || []).forEach(function(handler) {
        handler(evt);
        removeInPlace(onceListeners[type], handler);
      });
    },

    /**
     * Remove all the listeners for this emitter.
     */
    removeAllListeners: function removeAllListeners() {
      listeners = Object.create(null);
      onceListeners = Object.create(null);
    }
  };
}

