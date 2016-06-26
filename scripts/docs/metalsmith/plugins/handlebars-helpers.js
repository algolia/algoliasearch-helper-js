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

  var arrayRegexp = /Array\.<(.+)>/;
  Handlebars.registerHelper('type', function(options) {
    var match = arrayRegexp.exec(this);
    return options.fn(match ? match[1] + '[]' : this);
  });

  Handlebars.registerHelper('event', function(options) {
    return options.fn(this).split(':')[1];
  });
};
