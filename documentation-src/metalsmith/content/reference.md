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

{{> jsdoc jsdoc/main/algoliasearchHelper}}

### Search

Like the client, the sole purpose of the helper is to make
search query to Algolia.

There are two ways to generate a query
to Algolia.

 - The first one, using `search`, triggers the events and
all its parameters come directly from the internal search parameters
inside the Helper.
 - The second one, using `searchOnce`, is to be used
for one-shot searches that won't influence the rest of the app. It lets
you change the parameters before sending the query.

Most of the searches will be done using the first method.

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

### Conjunctive Facets

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

### State management

{{> jsdoc jsdoc/helper/getState}}
{{> jsdoc jsdoc/helper/setState}}
{{> jsdoc jsdoc/helper/overrideStateWithoutTriggeringChangeEvent}}
{{> jsdoc jsdoc/helper/getStateAsQueryString}}

### Events

{{> jsdoc jsdoc/helper/event:change}}
{{> jsdoc jsdoc/helper/event:search}}
{{> jsdoc jsdoc/helper/event:result}}
{{> jsdoc jsdoc/helper/event:error}}

## SearchResults

The SearchResults is the interface to read the results received from
Algolia search API. Most of the data is accessible directly through
properties. The exception being the data used for the features that
are implemented on top of Algolia API such as faceting.

### Results

{{> jsdoc jsdoc/results/hits}}

### Facets methods

{{> jsdoc jsdoc/results/getFacetValues}}
{{> jsdoc jsdoc/results/getFacetStats}}

### Geolocation data

{{> jsdoc jsdoc/results/aroundLatLng}}
{{> jsdoc jsdoc/results/automaticRadius}}

### Results metadata

{{> jsdoc jsdoc/results/hitsPerPage}}
{{> jsdoc jsdoc/results/nbHits}}
{{> jsdoc jsdoc/results/nbPages}}

### Parameters

{{> jsdoc jsdoc/results/index}}
{{> jsdoc jsdoc/results/query}}
{{> jsdoc jsdoc/results/page}}
{{> jsdoc jsdoc/results/parsedQuery}}

### Technical metadata

{{> jsdoc jsdoc/results/processingTimeMS}}
{{> jsdoc jsdoc/results/serverUsed}}
{{> jsdoc jsdoc/results/timeoutCounts}}
{{> jsdoc jsdoc/results/timeoutHits}}

## Types

The helper structures the way the data is sent and retrieved
from the Algolia API. Here is the list of those common structure
that you might encounter in the documentation.

{{> jsdoc jsdoc/helper/FacetRefinement}}
{{> jsdoc jsdoc/helper/NumericRefinement}}
{{> jsdoc jsdoc/results/Facet}}
{{> jsdoc jsdoc/results/HierarchicalFacet}}
{{> jsdoc jsdoc/results/FacetValue}}
{{> jsdoc jsdoc/state/FacetList}}
{{> jsdoc jsdoc/state/OperatorList}}
{{> jsdoc jsdoc/state/clearCallback}}

## SearchParameters

The SearchParameters is the class that structure all the parameters
that are needed to build a query to Algolia. It is usually reffered
as the state of the search. This state is available when receiving 
`change` and `search` events, and with `result` as a secondary
parameter.

SearchParameter is an immutable class. Each method that implies a
change of the value is actually returning a new instance, and the
previous is still the same as before the method call. The new
instance contain the change implied by the method call.

{{> jsdoc jsdoc/state/clearRefinements}}
{{> jsdoc jsdoc/state/clearTags}}
{{> jsdoc jsdoc/state/setQuery}}
{{> jsdoc jsdoc/state/setPage}}
{{> jsdoc jsdoc/state/setFacets}}
{{> jsdoc jsdoc/state/setDisjunctiveFacets}}
{{> jsdoc jsdoc/state/setHitsPerPage}}
{{> jsdoc jsdoc/state/setTypoTolerance}}
{{> jsdoc jsdoc/state/addNumericRefinement}}
{{> jsdoc jsdoc/state/getConjunctiveRefinements}}
{{> jsdoc jsdoc/state/getDisjunctiveRefinements}}
{{> jsdoc jsdoc/state/getHierarchicalRefinement}}
{{> jsdoc jsdoc/state/getExcludeRefinements}}
{{> jsdoc jsdoc/state/removeNumericRefinement}}
{{> jsdoc jsdoc/state/getNumericRefinements}}
{{> jsdoc jsdoc/state/getNumericRefinement}}
{{> jsdoc jsdoc/state/addFacetRefinement}}
{{> jsdoc jsdoc/state/addExcludeRefinement}}
{{> jsdoc jsdoc/state/addDisjunctiveFacetRefinement}}
{{> jsdoc jsdoc/state/addTagRefinement}}
{{> jsdoc jsdoc/state/removeFacetRefinement}}
{{> jsdoc jsdoc/state/removeExcludeRefinement}}
{{> jsdoc jsdoc/state/removeDisjunctiveFacetRefinement}}
{{> jsdoc jsdoc/state/removeTagRefinement}}
{{> jsdoc jsdoc/state/toggleRefinement}}
{{> jsdoc jsdoc/state/toggleFacetRefinement}}
{{> jsdoc jsdoc/state/toggleExcludeFacetRefinement}}
{{> jsdoc jsdoc/state/toggleDisjunctiveFacetRefinement}}
{{> jsdoc jsdoc/state/toggleHierarchicalFacetRefinement}}
{{> jsdoc jsdoc/state/toggleTagRefinement}}
{{> jsdoc jsdoc/state/isDisjunctiveFacet}}
{{> jsdoc jsdoc/state/isHierarchicalFacet}}
{{> jsdoc jsdoc/state/isConjunctiveFacet}}
{{> jsdoc jsdoc/state/isFacetRefined}}
{{> jsdoc jsdoc/state/isExcludeRefined}}
{{> jsdoc jsdoc/state/isDisjunctiveFacetRefined}}
{{> jsdoc jsdoc/state/isHierarchicalFacetRefined}}
{{> jsdoc jsdoc/state/isNumericRefined}}
{{> jsdoc jsdoc/state/isTagRefined}}
{{> jsdoc jsdoc/state/getRefinedDisjunctiveFacets}}
{{> jsdoc jsdoc/state/getRefinedHierarchicalFacets}}
{{> jsdoc jsdoc/state/getUnrefinedDisjunctiveFacets}}
{{> jsdoc jsdoc/state/getQueryParameter}}
{{> jsdoc jsdoc/state/setQueryParameter}}
{{> jsdoc jsdoc/state/setQueryParameters}}
{{> jsdoc jsdoc/state/filter}}
{{> jsdoc jsdoc/state/getHierarchicalFacetByName}}
{{> jsdoc jsdoc/state/make}}
{{> jsdoc jsdoc/state/validate}}

### General types

