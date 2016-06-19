'use strict';
var metalsmith = require('metalsmith');
var inPlace = require('metalsmith-in-place');
var markdown = require('metalsmith-markdown');
var jsdoc = require('./metalsmith/plugins/jsdoc-data.js');
var partials = require('metalsmith-discover-partials');
var layouts = require('metalsmith-layouts');

var builder = metalsmith(__dirname);

builder.metadata({})
       .ignore('.*')
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
         engine: 'handlebars',
         directory: './metalsmith/layouts'
       }))
       .build(function(err, data) {
         if(err) console.error(err);
         else console.log(data);
       });
