---
layout: documentation.jade
title: Reference
---

## AlgoliaSearchHelper

The `AlgoliaSearchHelper` is the main interface of the Helper library. It
lets you set the parameters for the search and retrieve information
during the search cycle with events:
 - `change`: when a parameter is set or updated
 - `search`: when the search is sent to Algolia
 - `result`: when the results are retrieved from Algolia
 - `error`: when Algolia sends back an error

You can also read the current parameters of the search using the AlgoliaSearchHelper
but it might not be the one you expect according to the last results received.

### Instanciate

### Search

{{> jsdoc jsdoc/helper/search}}
{{> jsdoc jsdoc/helper/searchOnce}}

### Query parameters

{{> jsdoc jsdoc/helper/setQueryParameter}}
{{> jsdoc jsdoc/helper/getQueryParameter}}

### Query parameters shortcuts

{{> jsdoc jsdoc/helper/setQuery}}
{{> jsdoc jsdoc/helper/setIndex}}
{{> jsdoc jsdoc/helper/getIndex}}
{{> jsdoc jsdoc/helper/setPage}}
{{> jsdoc jsdoc/helper/nextPage}}
{{> jsdoc jsdoc/helper/previousPage}}
{{> jsdoc jsdoc/helper/getPage}}

### Facets

{{> jsdoc jsdoc/helper/clearRefinements}}
{{> jsdoc jsdoc/helper/addFacetRefinement}}
{{> jsdoc jsdoc/helper/removeFacetRefinement}}
{{> jsdoc jsdoc/helper/toggleRefinement}}
{{> jsdoc jsdoc/helper/hasRefinements}}
{{> jsdoc jsdoc/helper/getRefinements}}

### Disjunctive facets

{{> jsdoc jsdoc/helper/clearRefinements}}
{{> jsdoc jsdoc/helper/addDisjunctiveFacetRefinement}}
{{> jsdoc jsdoc/helper/removeDisjunctiveFacetRefinement}}
{{> jsdoc jsdoc/helper/hasRefinements}}

### Hierarchical facets

{{> jsdoc jsdoc/helper/toggleRefinement}}
{{> jsdoc jsdoc/helper/getHierarchicalFacetBreadcrumb}}

### Facet exclusions

{{> jsdoc jsdoc/helper/addFacetExclusion}}
{{> jsdoc jsdoc/helper/removeFacetExclusion}}
{{> jsdoc jsdoc/helper/toggleFacetExclusion}}
{{> jsdoc jsdoc/helper/hasRefinements}}
{{> jsdoc jsdoc/helper/isExcluded}}

### Numeric filters

{{> jsdoc jsdoc/helper/addNumericRefinement}}
{{> jsdoc jsdoc/helper/removeNumericRefinement}}
{{> jsdoc jsdoc/helper/getNumericRefinement}}

### Tag filters

{{> jsdoc jsdoc/helper/clearTags}}
{{> jsdoc jsdoc/helper/addTag}}
{{> jsdoc jsdoc/helper/removeTag}}
{{> jsdoc jsdoc/helper/toggleTag}}
{{> jsdoc jsdoc/helper/hasTag}}
{{> jsdoc jsdoc/helper/getTags}}

### Events

{{> jsdoc jsdoc/helper/event:change}}
{{> jsdoc jsdoc/helper/event:search}}
{{> jsdoc jsdoc/helper/event:result}}
{{> jsdoc jsdoc/helper/event:error}}

## SearchResults

The SearchResults is the interface to read the results received from
Algolia search API. Most of the data is accessible directly through
properties. The exception being the data used for the features that
are implemented on top of Algolia API such as facetting.

### Results

{{> jsdoc jsdoc/results/hits}}

### Results metadata

{{> jsdoc jsdoc/results/hitsPerPage}}
{{> jsdoc jsdoc/results/nbHits}}
{{> jsdoc jsdoc/results/nbPages}}

### Geolocation data

{{> jsdoc jsdoc/results/aroundLatLng}}
{{> jsdoc jsdoc/results/automaticRadius}}

### Query parameters

{{> jsdoc jsdoc/results/index}}
{{> jsdoc jsdoc/results/query}}
{{> jsdoc jsdoc/results/page}}
{{> jsdoc jsdoc/results/parsedQuery}}

### Technical metadata

{{> jsdoc jsdoc/results/processingTimeMS}}
{{> jsdoc jsdoc/results/serverUsed}}
{{> jsdoc jsdoc/results/timeoutCounts}}
{{> jsdoc jsdoc/results/timeoutHits}}

### Facets

{{> jsdoc jsdoc/results/getFacetValues}}
{{> jsdoc jsdoc/results/getFacetStats}}

### Types

{{> jsdoc jsdoc/results/Facet}}
{{> jsdoc jsdoc/results/HierarchicalFacet}}
{{> jsdoc jsdoc/results/FacetValue}}

## SearchParameters
