---
layout: documentation.jade
title: Getting started with the helper
---

## Requirements

You need an Algolia account and your search credentials:
 - Application ID (referred later as `applicationID`)
 - Search API key (referred later as `apiKey`)

If you don't have one, you can create a new account for free on [algolia.com](https://www.algolia.com/users/sign_up).

You also need an index filled with data. Keep the index name `index` as we will use it in the rest of the *getting started*.

For the purpose of this tutorial, we'll use our ecommerce dataset:
 - applicationID: `latency`
 - apiKey: `249078a3d4337a8231f1665ec5a44966`
 - index: `bestbuy`

Feel free to tag along with your own data and adapt the steps to your use case. For now, let's see how to integrate the helper with your application / website.

## Integrate 

The helper is available on different platforms. You can use it as a script, via bower or NPM.

Because the helper extends the client, it also needs to be included in your project.

### Script tag

Include the following line in the header of your project:

```html
<script src="https://cdn.jsdelivr.net/g/algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2"></script>`
```

### Bower

In a bower compatible project, add the Helper with this command :

`bower install -S algoliasearch-client algoliasearch-helper`

### NPM

In an NPM project, include the project with this command:

`npm install --save algoliasearch-client algoliasearch-helper`

## First search

For this example, we are going to use jQuery but the Helper can be used with any JS library / framework.

The first step toward searching in your index, is to initialize the client and provide it to the helper factory.

```javascript
/* if you use NPM, you also need to add the correct requirements
var algoliasearch = require('algoliasearch');
var algoliasearchHelper = require('algoliasearch-helper');
*/
var client = algoliasearch(applicationID, apiKey);
var helper = algoliasearchHelper(client, index);
```

Once you've added those lines, you need to listen to the results coming from Algolia.
For now, we'll implement a very basic display of the JSON response in the page.

```javascript
helper.on('result', function(content) {
  renderHits(content);
});

function renderHits(content) {
  $('#container').html(JSON.stringify(content, null, 2));
}
```

At this point, we have no results, yet. It's because we didn't trigger any search.
For now, we will do an *empty search* on your $index. This will return the results
ordered according to the *custom ranking*. Let's see, how to trigger the search:

```javascript
helper.search();
```

The `search` method of the helper triggers the search with the current parameters
saved in the helper. For the moment we have none, therefore the results contains
the first records ordered by the *custom ranking*.

See this step [live on jsFiddle](http://jsfiddle.net/gh/gist/jquery/2.2.4/0a8e77b2fd0694046e986e0138feb697/).

You now know:
 - how to instanciate the helper
 - listen to the `result` event and read the results from Algolia
 - trigger a search to algolia

## Setting the query

The empty search is a great tool to display the first step of a search but it
is not what our users are looking for. They want to search in your data. Let's
see how to add a search input to let our users do a textual search in the data.

Before going further, let's customize a little bit the display of our results.
We're going to focus on the actual results / records computed by Algolia. The
records are returned in the `hits` attribute of the `content`. Let's display
only the `name` of each product for now.

```javascript
helper.on('result', function(content) {
  renderHits(content);
});

function renderHits(content) {
  $('#container').html('').append(function() {
    return $.map(content.hits, function(hit) {
      return $('<li>').html(hit.name);
    });
  });
}
```

Now that we have filtered the information displayed, let's add our search input:

```html
<input type="text" autocomplete="off" id="search-box"/>
```

And now let's listen to the changes to this input, so that we can update the query
and trigger a new search.

```javascript
$('#search-box').on('keyup', function() {
  helper.setQuery($(this).val())
        .search();
});
```

When calling `setQuery`, we change the value of the query inside the helper.
But this does not trigger the search, we need to trigger it manually, that's
why we call `search` afterwards.

To help our users better understand the results, let's use the highlighted
results returned by Algolia. This way the users can easily focus on what changed
with the input of new characters.

```javascript
helper.on('result', function(content) {
  renderHits(content);
});

function renderHits(content) {
  $('#container').html('').append(function() {
    return $.map(content.hits, function(hit) {
      return $('<li>').html(hit._highlightResult.name.value);
    });
  });
}
```

The object `_highlightResult` contains the all the attributes that may be highlighted
(by default, all the searchable attributes).

See this part [live in action on JSFiddle](http://jsfiddle.net/gh/gist/jquery/2.2.4/80e20fcda7f3894ade08eb2c3759516b/).

In this part, we have seen:
 - how to set the query of the search
 - how to trigger the search
 - how to display highlighting to help our users
 - how to plug all these to make an interactive search

## Adding facets

A facet is a filter that can be used to restrict the results to specific values
of an attribute. For example, in our records we have an attribute `type`, with
a facet we can restrict the results to only `movie`. This way the results returned
by Algolia will only be those for which the attribute `type` has `movie` as a value.

If you're using you're own data in this tutorial, you must add the attributes you
want to facet in the [display configuration of your index](https://www.algolia.com/explorer#?tab=display).

First we should declare that we want to use the attribute `type` as a facet. This is done
during the initialization of the helper.

```javascript
var helper = algoliasearchHelper(client, index, {
  facets: ['type']
});
```

The list of available facets is returned by the Algolia API. This list is dynamic
and should be updated at each new results. So that's why we render this list each
time we receive new results. This list also let our user select a value, so we should
also make it so it's possible using jQuery.

```javascript
$('#facet-list').on('click', function(e) {
  var facetValue = $(e.target).data('facet');  
  if(!facetValue) return;
  helper.toggleRefinement('type', facetValue)
        .search();
});

function renderFacetList(content) {
  $('#facet-list').html('').append(function() {
    return $.map(content.getFacetValues('type'), function(facet) {
      var checkbox = $('<input type=checkbox>')
        .attr('data-facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if(facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
                              .attr('for', 'fl-' + facet.name);
      return $('<li>').append(checkbox).append(label);
    });
  });
}
```

The methode `getFacetValues` returns the list of values usable to filter
an attribute. The objet returned by this method contains three properties: 

 - `name`: the value of the facet
 - `count`: the number of items in the whole results
 - `isRefined`: is this value already selected

Let's add the rendering of the facet list into the `result` handler.

```javascript
helper.on('result', function(content) {
  renderFacetList(content);
  renderHits(content);
});
```

We now have a menu displaying the values that the user can choose from
to filter the list of results. Those values are generated by Algolia
based on the rest of the search, meaning that it won't provide facet
values that are meaningful for the current other parameters. Try typing
*apple* and the filter item *movie* will be removed.

This kind of facets are called *conjunctive facets* but they are not the only
kind of filtering that you can apply with the helper. You can also do:

 - disjunctive facetting (for making multiple choices filters)
 - hierarchical facetting (for making hierarchical navigations)
 - numerical filtering
 - tag filtering

See this sample [live on jsFiddle](http://jsfiddle.net/gh/gist/jquery/2.2.4/76884d7261e6cc06d0d23b1bd0a11c96/).

In this part, we have seen:

 - how to declare a facet in the configuration of the helper
 - how to display the facet values computed by the API
 - how to refine a facet

## Going further

Congratulations! You now know the basics of the Helper. You should,
by now, have a better overview of the kind of features available in the
Helper, as well as the mechanics involved.

Here are some pointers on where to go next:

 - [the instantsearch tutorial](https://www.algolia.com/doc/search/instant-search/algoliahelperjs), for a more in-depth UI/UX oriented tutorial
 - [the reference documentation](reference.html), to see the whole possibilities of the Helper API
 - [the examples](examples.html), to see how to implement common patterns using the Helper
 - [the concepts](concepts.html), for a more high level presentation of the Helper API

Last but not least, the Helper is an intermediate API on top of the client
and it doesn't solve the UI complexity on its own. If you're looking for
a more off-the-shelf solution, we created [instantsearch.js](https://community.algolia.com/instantsearch.js/) 
which reuses the helper internally.
