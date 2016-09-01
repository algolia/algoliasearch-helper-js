'use strict';
var util = require('util');
var events = require('events');

function DerivedHelper(mainHelper, fn) {
  this.main = mainHelper;
  this.fn = fn;
  this.lastResults = null;
}

util.inherits(DerivedHelper, events.EventEmitter);

/**
 * Detach this helper from the main helper
 */
DerivedHelper.prototype.detach = function() {
};

DerivedHelper.prototype.getModifiedState = function(parameters) {
  return this.fn(parameters);
};

module.exports = DerivedHelper;
