'use strict';

try {
  var warn;

  if (typeof window !== 'undefined') warn = window.console && window.console.warn.bind(console);
  else warn = console.warn.bind(console); // eslint-disable-line no-console

  var warnOnce = (function(w) {
    var previousMessages = [];
    return function warnOnlyOnce(m) {
      if (previousMessages.indexOf(m) === -1) {
        w(m);
        previousMessages.push(m);
      }
    };
  })(warn);

  module.exports = warnOnce;
} catch (e) {
  module.exports = function() {};
}
