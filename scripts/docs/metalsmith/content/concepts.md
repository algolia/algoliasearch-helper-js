---
layout: documentation.jade
title: Helper core concepts
---

## High level concepts

### Search flow

The search flow is the cycle between the UI and the search engine.
When a user updates a parameter in the UI, a new search is triggered,
and new results appear. But not only these results are updated, but
also all the filters available should be too.

The helper makes this flow happen naturally.

### Search states

Each new update in the search filter must be applied on all the others
that were previously selected as well. Instead of having to create your
own layer of query management, the helper already does it.

## Advanced facetting

Common patterns implemented as features on top of the API provided by Algolia.

Algolia is by itself very powerful. But sometimes we want to be able to
add more to the 

### Disjunctive facetting

### Hierarchical facetting

## Special capabilities

### Event based

### Chainability

### Smart page behaviour

### Immutability
