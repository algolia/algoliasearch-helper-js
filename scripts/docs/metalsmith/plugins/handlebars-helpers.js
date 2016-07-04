'use strict';
var Handlebars = require('handlebars');
var marked = require('marked');
marked.setOptions({
  gfm: true
});
module.exports = function(requires) {
  requires.handlebars = Handlebars;

  Handlebars.registerHelper('switch', function(value, options) {
    this._switch_value_ = value;
    var html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;
  });

  Handlebars.registerHelper('case', function(value, options) {
    if (value === this._switch_value_) {
      return options.fn(this);
    }
  });

  Handlebars.registerHelper('md', function(options) {
    return new Handlebars.SafeString(marked(options.fn(this)));
  });

  var arrayRegexp = /^Array\.<(.+?)>$/;
  var mapRegexp = /^Object\.<string, \(?(.+?)\)?>$/;
  var unionRegexp = /([^|()]+)/gi;
  function formatGenerics(type) {
    var matchArray = arrayRegexp.exec(type);
    if (matchArray) return formatGenerics(matchArray[1]) + '[]';
    var matchMap = mapRegexp.exec(type);
    if (matchMap) return '{ string: ' + formatGenerics(matchMap[1]) + ' }';
    var union = [];
    var m = unionRegexp.exec(type);
    while (m) {
      union.push(m[1]);
      m = unionRegexp.exec(type);
    }
    if (union.length > 1) return '(' + union.map(formatGenerics).join('|') + ')';
    return type;
  }
  Handlebars.registerHelper('type', function(options) {
    return options.fn(formatGenerics(this));
  });

  Handlebars.registerHelper('event', function(options) {
    return options.fn(this).split(':')[1];
  });
};
