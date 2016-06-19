var jsdoc2md = require('jsdoc-to-markdown');
var dmd = require('dmd');
var fs = require('fs');
var util = require('util');
var path = require('path');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var collectJson = require('collect-json');

/* paths used by this script */
var p = {
  src: [
    path.join(__dirname, '../../src/algoliasearch.helper.js')
  ],
  output: path.join(__dirname, '../../docs/_includes/helper-methods')
};

// clean
rimraf.sync(p.output);
mkdirp.sync(p.output);

/* we only need to parse the source code once, so cache it */
jsdoc2md({src: p.src, json: true}).pipe(collectJson(dataReady));

function dataReady(data) {
  /* we are gonna document only the functions, basically the widgets and sometime some
  other functions like the instantsearch() one */
  var fns = data.filter(token => token.kind === 'function');

  /* render an output file for each class */
  renderMarkdown(data, fns);
}

function renderMarkdown(data, fns) {
  var template = fs.readFileSync(path.resolve(__dirname, './widgetTemplate.hbs'), 'utf8');

  fns.forEach(fn => {
    var dmdStream = dmd({
      template: util.format(template, fn.name),
      helper: ['./scripts/helpers']
    });

    dmdStream.pipe(fs.createWriteStream(path.join(p.output, `${fn.name}.md`)));
    dmdStream.end(JSON.stringify(data));
  });
}
