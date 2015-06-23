"use strict";
var SearchParameters = require( "./SearchParameters" );
var SearchResults = require( "./SearchResults" );
var extend = require( "./functions/extend" );
var util = require( "util" );
var events = require( "events" );
var forEach = require( "lodash/collection/forEach" );
var bind = require( "lodash/function/bind" );

/**
 * Initialize a new AlgoliaSearchHelper
 * @class
 * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
 * search. It provides an event based interface for search callbacks :
 *  - change : when the internal search state is changed.
 *    This event contains a {SearchParameters} object and the {SearchResults} of the last result if any.
 *  - result : when the response is retrieved from Algolia and is processed.
 *    This event contains a {SearchResults} object and the {SearchParameters} corresponding to this answer.
 *  - error  : when the response is an error. This event contains the error returned by the server.
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the index name to query
 * @param  {SearchParameters | object} options an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
 */
function AlgoliaSearchHelper( client, index, options ) {
  this.client = client;
  this.index = index;
  this.state = SearchParameters.make( options );
  this.lastResults = null;
  this._queryId = 0;
  this._lastQueryIdReceived = -1;
}

util.inherits( AlgoliaSearchHelper, events.EventEmitter );

/**
 * Start the search with the parameters set in the state.
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.search = function() {
  this._search();
  return this;
};

/**
 * Sets the query. Also sets the current page to 0.
 * @param  {string} q the user query
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setQuery = function( q ) {
  this.state = this.state.setQuery( q );
  this._change();
  return this;
};

/**
 * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
 * @param {string} [name] - If given, name of the facet / attribute on which  we want to remove all refinements
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.clearRefinements = function( name ) {
  this.state = this.state.clearRefinements( name );
  this._change();
  return this;
};

/**
 * Remove all the tag filtering
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.clearTags = function() {
  this.state = this.state.clearTags();
  this._change();
  return this;
};

/**
 * Ensure a facet refinement exists
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function( facet, value ) {
  this.state = this.state.addDisjunctiveFacetRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Add a numeric refinement on the given attribute
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} operator the operator of the filter
 * @param  {number} value the value of the filter
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.addNumericRefinement = function( attribute, operator, value ) {
  this.state = this.state.addNumericRefinement( attribute, operator, value );
  this._change();
  return this;
};

/**
 * Ensure a facet refinement exists
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.addRefine = function( facet, value ) {
  this.state = this.state.addFacetRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Ensure a facet exclude exists
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.addExclude = function( facet, value ) {
  this.state = this.state.addExcludeRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Add a tag refinement
 * @param {string} tag the tag to add to the filter
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.addTag = function( tag ) {
  this.state = this.state.addTagRefinement( tag );
  this._change();
  return this;
};

/**
 * Remove a numeric filter.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} operator the operator of the filter
 * @param  {number} value the value of the filter
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.removeNumericRefinement = function( attribute, operator, value ) {
  this.state = this.state.removeNumericRefinement( attribute, operator, value );
  this._change();
  return this;
};


/**
 * Ensure a facet refinement does not exist
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function( facet, value ) {
  this.state = this.state.removeDisjunctiveFacetRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Ensure a facet refinement does not exist
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.removeRefine = function( facet, value ) {
  this.state = this.state.removeFacetRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Ensure a facet exclude does not exist
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.removeExclude = function( facet, value ) {
  this.state = this.state.removeExcludeRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Ensure that a tag is not filtering the results
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.removeTag = function( tag ) {
  this.state = this.state.removeTagRefinement( tag );
  this._change();
  return this;
};

/**
 * Toggle refinement state of an exclude
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.toggleExclude = function( facet, value ) {
  this.state = this.state.toggleExcludeFacetRefinement( facet, value );
  this._change();
  return this;
};

/**
 * Toggle refinement state of a facet
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.toggleRefine = function( facet, value ) {
  if( this.state.isConjunctiveFacet( facet ) ) {
    this.state = this.state.toggleFacetRefinement( facet, value );
  }
  else if( this.state.isDisjunctiveFacet( facet ) ) {
    this.state = this.state.toggleDisjunctiveFacetRefinement( facet, value );
  }
  else {
    /* eslint-disable */
    console.log( "warning : you're trying to refine the undeclared facet '" + facet +
                "'; add it to the helper options 'facets' or 'disjunctiveFacets'" );
    /* eslint-enable */
    return this;
  }
  this._change();
  return this;
};

/**
 * Toggle tag refinement
 * @param {string} tag tag to remove or add
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.toggleTag = function( tag ) {
  this.state = this.state.toggleTagRefinement( tag );
  this._change();
  return this;
};

/**
 * Go to next page
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.nextPage = function() {
  return this.setCurrentPage( this.state.page + 1 );
};

/**
 * Go to previous page
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.previousPage = function() {
  return this.setCurrentPage( this.state.page - 1 );
};

/**
 * Change the current page
 * @param  {integer} page The page number
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setCurrentPage = function( page ) {
  if( page < 0 ) throw new Error( "Page requested below 0." );

  this.state = this.state.setPage( page );
  this._change();
  return this;
};

/**
 * Configure the underlying index name
 * @param {string} name the index name
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setIndex = function( name ) {
  this.index = name;
  this.setCurrentPage( 0 );
  return this;
};

/**
 * Update any single parameter of the state/configuration (based on SearchParameters).
 * @param {string} parameter name of the parameter to update
 * @param {any} value new value of the parameter
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setQueryParameter = function( parameter, value ) {
  var newState = this.state.setQueryParameter( parameter, value );

  if( this.state === newState ) return this;

  this.state = newState;
  this._change();
  return this;
};

/**
 * Set the whole state ( warning : will erase previous state )
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper}
 */
AlgoliaSearchHelper.prototype.setState = function( newState ) {
  this.state = new SearchParameters( newState );
  this._change();
  return this;
};

/**
 * Override the current state without triggering a change event.
 * Do not use this method unless you know what you are doing. (see the example
 * for a legit use case)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper}
 * @example
 *  helper.on( "change", function( state ){
 *    // In this function you might want to find a way to store the state in the url/history
 *    updateYourURL( state );
 *  } );
 *  window.onpopstate = function( event ){
 *    // This is naive though as you should check if the state is really defined etc.
 *    helper.overrideStateWithoutTriggeringChangeEvent( event.state ).search();
 *  }
 */
AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent = function( newState ) {
  this.state = new SearchParameters( newState );
  return this;
};

/**
 * Check the refinement state of a given value for a facet
 * @param  {string}  facet the facet
 * @param  {string}  value the associated value
 * @return {boolean} true if refined
 */
AlgoliaSearchHelper.prototype.isRefined = function( facet, value ) {
  if( this.state.isConjunctiveFacet( facet ) ) {
    return this.state.isFacetRefined( facet, value );
  }
  else if( this.state.isDisjunctiveFacet( facet ) ) {
    return this.state.isDisjunctiveFacetRefined( facet, value );
  }
  return false;
};

/**
 * Check if the facet has any disjunctive or conjunctive refinements
 * @param {string} facet the facet attribute name
 * @return {boolean} true if the facet is facetted by at least one value
 */
AlgoliaSearchHelper.prototype.hasRefinements = function( facet ) {
  return this.isRefined( facet );
};

/**
 * Check the exclude state of a facet
 * @param  {string}  facet the facet
 * @param  {string}  value the associated value
 * @return {boolean} true if refined
 */
AlgoliaSearchHelper.prototype.isExcluded = function( facet, value ) {
  return this.state.isExcludeRefined( facet, value );
};

/**
 * Check the refinement state of the disjunctive facet
 * @param  {string}  facet the facet
 * @param  {string}  value the associated value
 * @return {boolean} true if refined
 */
AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function( facet, value ) {
  return this.state.isDisjunctiveFacetRefined( facet, value );
};

/**
 * Check if the string is a currently filtering tag
 * @param {string} tag tag to check
 * @return {boolean}
 */
AlgoliaSearchHelper.prototype.isTagRefined = function( tag ) {
  return this.state.isTagRefined( tag );
};

/**
 * Get the underlying configured index name
 * @return {string}
 */
AlgoliaSearchHelper.prototype.getIndex = function() {
  return this.index;
};

/**
 * Get the currently selected page
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getCurrentPage = function() {
  return this.state.page;
};

/**
 * Get all the filtering tags
 * @return {string[]}
 */
AlgoliaSearchHelper.prototype.getTags = function() {
  return this.state.tagRefinements;
};

/**
 * Get a parameter of the search by its name
 * @param {string} parameterName the parameter name
 * @return {any} the parameter value
 */
AlgoliaSearchHelper.prototype.getQueryParameter = function( parameterName ) {
  return this.state.getQueryParameter( parameterName );
};

/**
 * Get the list of refinements for a given attribute.
 * @param {string} facetName attribute name used for facetting
 * @return {Refinement[]} All Refinement are objects that contain a value, and a type. Numeric also contains an operator.
 */
AlgoliaSearchHelper.prototype.getRefinements = function( facetName ) {
  var refinements = [];

  if( this.state.isConjunctiveFacet( facetName ) ) {
    var conjRefinements = this.state.getConjunctiveRefinements( facetName );
    forEach( conjRefinements, function( r ) {
      refinements.push( {
        value : r,
        type : "conjunctive"
      } );
    } );
  }
  else if( this.state.isDisjunctiveFacet( facetName ) ) {
    var disjRefinements = this.state.getDisjunctiveRefinements( facetName );
    forEach( disjRefinements, function( r ) {
      refinements.push( {
        value : r,
        type : "disjunctive"
      } );
    } );
  }

  var excludeRefinements = this.state.getExcludeRefinements( facetName );
  forEach( excludeRefinements, function( r ) {
    refinements.push( {
      value : r,
      type : "exclude"
    } );
  } );

  var numericRefinements = this.state.getNumericRefinements( facetName );
  forEach( numericRefinements, function( value, operator ) {
    refinements.push( {
      value : value,
      operator : operator,
      type : "numeric"
    } );
  } );

  return refinements;
};

///////////// PRIVATE

/**
 * Perform the underlying queries
 * @private
 * @return {undefined}
 */
AlgoliaSearchHelper.prototype._search = function() {
  var state = this.state;
  var queries = [];

  //One query for the hits
  queries.push( {
    indexName : this.index,
    query : state.query,
    params : this._getHitsSearchParams()
  } );

  //One for each disjunctive facets
  forEach( state.getRefinedDisjunctiveFacets(), function( refinedFacet ) {
    queries.push( {
      indexName : this.index,
      query : state.query,
      params : this._getDisjunctiveFacetSearchParams( refinedFacet )
    } );
  }, this );

  this.client.search( queries,
                      bind( this._handleResponse,
                            this,
                            state,
                            this._queryId++ ) );
};

/**
 * Transform the response as sent by the server and transform it into a user
 * usable objet that merge the results of all the batch requests.
 * @private
 * @param {SearchParameters} state state used for to generate the request
 * @param {number} queryId id of the current request
 * @param {Error} err error if any, null otherwise
 * @param {object} content content of the response
 * @return {undefined}
 */
AlgoliaSearchHelper.prototype._handleResponse = function( state, queryId, err, content ) {
  if( queryId < this._lastQueryIdReceived ) {
    // Outdated answer
    return;
  }

  this._lastQueryIdReceived = queryId;

  if ( err ) {
    this.emit( "error", err );
    return;
  }

  var formattedResponse = this.lastResults = new SearchResults( state, content );
  this.emit( "result", formattedResponse, state );
};

/**
 * Build search parameters used to fetch hits
 * @private
 * @return {object.<string, any>}
 */
AlgoliaSearchHelper.prototype._getHitsSearchParams = function() {
  var query = this.state.query;
  var facets = this.state.facets.concat( this.state.disjunctiveFacets );
  var facetFilters = this._getFacetFilters();
  var numericFilters = this._getNumericFilters();
  var tagFilters = this._getTagFilters();
  var additionalParams = {
    facets : facets,
    tagFilters : tagFilters
  };

  if( this.state.distinct === true || this.state.distinct === false ) {
    additionalParams.distinct = this.state.distinct;
  }
  if( !this.containsRefinement( query, facetFilters, numericFilters, tagFilters ) ) {
    additionalParams.distinct = false;
  }

  if( facetFilters.length > 0 ) {
    additionalParams.facetFilters = facetFilters;
  }

  if( numericFilters.length > 0 ) {
    additionalParams.numericFilters = numericFilters;
  }

  return extend( this.state.getQueryParams(), additionalParams );
};

/**
 * Build search parameters used to fetch a disjunctive facet
 * @private
 * @param  {string} facet the associated facet name
 * @return {object}
 */
AlgoliaSearchHelper.prototype._getDisjunctiveFacetSearchParams = function( facet ) {
  var query = this.state.query;
  var facetFilters = this._getFacetFilters( facet );
  var numericFilters = this._getNumericFilters( facet );
  var tagFilters = this._getTagFilters();
  var additionalParams = {
    hitsPerPage : 1,
    page : 0,
    attributesToRetrieve : [],
    attributesToHighlight : [],
    attributesToSnippet : [],
    facets : facet,
    tagFilters : tagFilters
  };

  if( this.state.distinct === true || this.state.distinct === false ) {
    additionalParams.distinct = this.state.distinct;
  }
  if( !this.containsRefinement( query, facetFilters, numericFilters, tagFilters ) ) {
    additionalParams.distinct = false;
  }

  if( numericFilters.length > 0 ) {
    additionalParams.numericFilters = numericFilters;
  }

  if( facetFilters.length > 0 ) {
    additionalParams.facetFilters = facetFilters;
  }

  return extend( this.state.getQueryParams(), additionalParams );
};

AlgoliaSearchHelper.prototype.containsRefinement = function( query, facetFilters, numericFilters, tagFilters ) {
  return query ||
         facetFilters.length !== 0 ||
         numericFilters.length !== 0 ||
         tagFilters.length !== 0;
};

/**
 * Return the numeric filters in an algolia request fashion
 * @private
 * @param {string} [facetName] the name of the attribute for which the filters should be excluded
 * @return {string[]} the numeric filters in the algolia format
 */
AlgoliaSearchHelper.prototype._getNumericFilters = function( facetName ) {
  var numericFilters = [];
  forEach( this.state.numericRefinements, function( operators, attribute ) {
    forEach( operators, function( value, operator ) {
      if( facetName !== attribute ) {
        numericFilters.push( attribute + operator + value );
      }
    } );
  } );
  return numericFilters;
};

/**
 * Return the tags filters depending
 * @private
 * @return {string}
 */
AlgoliaSearchHelper.prototype._getTagFilters = function() {
  if( this.state.tagFilters ) {
    return this.state.tagFilters;
  }

  return this.state.tagRefinements.join( "," );
};

/**
 * Test if there are some disjunctive refinements on the facet
 * @private
 * @param {string} facet the attribute to test
 * @return {boolean}
 */
AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function( facet ) {
  return this.state.disjunctiveRefinements[ facet ] &&
         this.state.disjunctiveRefinements[ facet ].length > 0;
};

/**
 * Build facetFilters parameter based on current refinements. The array returned
 * contains strings representing the facet filters in the algolia format.
 * @private
 * @param  {string} [facet] if set, the current disjunctive facet
 * @return {array.<string>}
 */
AlgoliaSearchHelper.prototype._getFacetFilters = function( facet ) {
  var facetFilters = [];

  forEach( this.state.facetsRefinements, function( facetValues, facetName ) {
    forEach( facetValues, function( facetValue ) {
      facetFilters.push( facetName + ":" + facetValue );
    } );
  } );

  forEach( this.state.facetsExcludes, function( facetValues, facetName ) {
    forEach( facetValues, function( facetValue ) {
      facetFilters.push( facetName + ":-" + facetValue );
    } );
  } );

  forEach( this.state.disjunctiveFacetsRefinements, function( facetValues, facetName ) {
    if( facetName === facet || !facetValues || facetValues.length === 0 ) return;
    var orFilters = [];
    forEach( facetValues, function( facetValue ) {
      orFilters.push( facetName + ":" + facetValue );
    } );
    facetFilters.push( orFilters );
  } );

  return facetFilters;
};

AlgoliaSearchHelper.prototype._change = function() {
  this.emit( "change", this.state, this.lastResults );
};

module.exports = AlgoliaSearchHelper;
