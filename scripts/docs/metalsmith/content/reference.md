---
layout: documentation.jade
title: Reference
---

## AlgoliaSearchHelper

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

## SearchResults

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
