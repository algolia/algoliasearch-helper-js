[![Stories in Ready](https://badge.waffle.io/algolia/algoliasearch-helper-js.png?label=ready&title=Ready)](https://waffle.io/algolia/algoliasearch-helper-js)
# algoliasearch-helper-js

This module is the companion of the algoliasearch-client-js. It helps you keep
track of the search parameters and provides a higher level API.

The helper is built on top of algoliasearch-client-js and this version is 
specifically made to work with the newest V3 versions of it.

## Features

 - Search parameters tracking
 - Facets exclusions
 - Pagination
 - Disjunctive facetting (search on two or more values for a single facet)
 - Query batching

## What does it look like?

```javascript
var algoliasearch = require( "algoliasearch" );
var algoliasearchHelper = require( "algoliasearch-helper" );

var client = algoliasearch( "GKDHJFHGN", "kfhjd02dsfklh" );

var helper = algoliasearchHelper( client, "myMainIndex", { 
  facets : ["mainCharacterFirstName", "year"],
  disjunctiveFacets : ["producer"]
});

helper.addDisjunctiveRefine( "director", "Clint Eastword" );
helper.addDisjunctiveRefine( "director", "Sofia Coppola" );

helper.addRefine( "year", "2003" );

// Search for any movie filmed in 2003 and directed by either C. Eastwood or S. Coppola
helper.search( "", function( err, data ){
  console.log( err ? "Error : " + data.message : data );
} );
```

## How to use this module

(See the examples in action)[http://algolia.github.io/algoliasearch-helper-js/]

### Use with NPM

`npm install algoliasearch-helper`

### Use with bower

`bower install algoliasearch-helper`

### Use the CDN

Include this in your page :

`<script src="//cdn.jsdelivr.net/algoliasearch.helper/1.0.0/algoliasearch.helper.min.js"></script>`

## How to contribute

 - fork this repo
 - clone the repository `git clone https://github.com/[your-handle-here]/algoliasearch-helper-js.git`
 - make your fix or feature
 - launch the dev mode  `npm run dev`
 - add a test for your feature (see /test folder)
 - make sure, it goes through the linter without an error `npm run lint`
 - [propose your pull request](https://help.github.com/articles/creating-a-pull-request/)
 - profit :)

A quick note though, even though we'll make our best to read and integrate your PR,
we may be a bit slow. Sorry :). We might also make some comments and discussions too,
for the best interest of this library. *Thanks in advance for your contribution!*
