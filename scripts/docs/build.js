'use strict';
var path = require('path');
var http = require('http');
var forEach = require('lodash/forEach');

var metalsmith = require('metalsmith');
var gulp = require('gulp');

var inPlace = require('metalsmith-in-place');
var markdown = require('metalsmith-markdown');
var jsdoc = require('./metalsmith/plugins/jsdoc-data.js');
var partials = require('metalsmith-discover-partials');
var layouts = require('metalsmith-layouts');
// var changed = require('metalsmith-changed');
var headings = require('metalsmith-headings');
var metallic = require('metalsmith-metallic');

var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var st = require('st');

var src = {
  stylesheets: path.join(__dirname, './metalsmith/stylesheets/**/*.scss'),
  content: path.join(__dirname, './metalsmith/content'),
  layouts: path.join(__dirname, './metalsmith/layouts'),
  partials: path.join(__dirname, './metalsmith/partials')
};

function makeMetalsmithBuilder() {
  var builder = metalsmith(__dirname);
  return builder.metadata({})
                .ignore('.*')
                .clean(false)
                .source(src.content)
                .destination('../../documentation')
                .use(partials({
                  directory: src.partials,
                  pattern: /\.hbs$/
                }))
                .use(jsdoc({
                  src: '../../../../src/algoliasearch.helper.js',
                  namespace: 'helper'
                }))
                .use(inPlace({
                  engine: 'handlebars'
                }))
                .use(metallic())
                .use(markdown({
                  gfm: true
                }))
                .use(headings('h2'))
                .use(layouts({
                  engine: 'jade',
                  directory: src.layouts
                }));
}
gulp.task('doc:content', function(cb) {
  makeMetalsmithBuilder().build(cb);
});
gulp.task('doc:content:watch', function(cb) {
  makeMetalsmithBuilder().build(function(err, data) {
    forEach(data, (o, filename) => {
      if (filename !== 'metalsmith-changed-ctimes.json') {
        livereload.changed(filename);
      }
    });
    cb(err);
  });
});

function gulpStyle() {
  return gulp.src(src.stylesheets)
             .pipe(sass().on('error', sass.logError))
             .pipe(gulp.dest(path.join(__dirname, '../../documentation/css')));
}
gulp.task('doc:style', gulpStyle);
gulp.task('doc:style:watch', function() {
  return gulpStyle().pipe(livereload());
});

gulp.task('doc:images', function() {
  return gulp.src(path.join(__dirname, 'metalsmith/images/**/*.*'))
             .pipe(gulp.dest(path.join(__dirname, '../../documentation/images')));
});

gulp.task('doc:all:watch', function() {
  livereload.listen();
  gulp.watch(src.stylesheets, ['doc:style:watch']);
  gulp.watch(src.content + '/**/*.md', ['doc:content:watch']);
  gulp.watch(src.partials + '/**/*.hbs', ['doc:content:watch']);
  gulp.watch(src.layouts + '/**/*.jade', ['doc:content:watch']);
});

gulp.task('doc:server', function(done) {
  http.createServer(
    st({path: path.join(__dirname, '../../documentation'), index: 'index.html', cache: false})
  ).listen(8083, done);
});

gulp.task('doc:watch', ['doc:server', 'doc:all:watch', 'doc:content:watch']);
gulp.task('doc', ['doc:content', 'doc:style', 'doc:images']);
