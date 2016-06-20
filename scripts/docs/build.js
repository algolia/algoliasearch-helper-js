'use strict';
var path = require('path');
var http = require('http');

var metalsmith = require('metalsmith');
var gulp = require('gulp');

var inPlace = require('metalsmith-in-place');
var markdown = require('metalsmith-markdown');
var jsdoc = require('./metalsmith/plugins/jsdoc-data.js');
var partials = require('metalsmith-discover-partials');
var layouts = require('metalsmith-layouts');

var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var st = require('st');

var src = {
  stylesheets: path.join(__dirname, './metalsmith/stylesheets/**/*.scss')
};

gulp.task('doc:content', function(cb) {
  var builder = metalsmith(__dirname);
  builder.metadata({})
         .ignore('.*')
         .clean(false)
         .source('./metalsmith/content')
         .destination('../../documentation')
         .use(partials({
           directory: './metalsmith/partials',
           pattern: /\.hbs$/
         }))
         .use(jsdoc({
           src: '../../../../src/algoliasearch.helper.js',
           namespace: 'helper'
         }))
         .use(inPlace({
           engine: 'handlebars'
         }))
         .use(markdown({
           gfm: true
         }))
         .use(layouts({
           engine: 'jade',
           directory: './metalsmith/layouts'
         }))
         .build(function(err) {
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
});

gulp.task('doc:server', function(done) {
  http.createServer(
    st({path: path.join(__dirname, '../../documentation'), index: 'index.html', cache: false})
  ).listen(8083, done);
});

gulp.task('doc:watch', ['doc:server', 'doc:all:watch']);
gulp.task('doc', ['doc:content', 'doc:style', 'doc:images']);
