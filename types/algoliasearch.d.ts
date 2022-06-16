// Note: Below, we will be importing all algoliasearch v3,4,5 types.
// The goal is being able to export the algoliasearch-helper types using
// the version of the client installed by the developer.

// @ts-ignore
import type algoliasearch from 'algoliasearch/lite';
// @ts-ignore
import type * as AlgoliaSearchLiteV5 from 'algoliasearch-lite';
// @ts-ignore
import type * as AlgoliaSearch from 'algoliasearch';
// @ts-ignore
import type * as ClientSearch from '@algolia/client-search';

// turns any to unknown, so it can be used as a conditional
type AnyToUnknown<T> = any extends T ? unknown : T;

type DummySearchClientV4 = {
  transporter: unknown;
};

type DummySearchClient = {
  search: unknown;
};

// @ts-ignore
type ClientLiteV5 = ReturnType<
  // @ts-ignore
  typeof AlgoliaSearchLiteV5.algoliasearchLiteClient
>;
// @ts-ignore
type ClientFullV5 = ReturnType<typeof AlgoliaSearch.algoliasearch>;
type ClientV5 = AnyToUnknown<
  ClientLiteV5 extends DummySearchClient ? ClientLiteV5 : ClientFullV5
>;

type PickForClient<
  T extends {
    v3: unknown;
    v4: unknown;
    v5: unknown;
  }
> = ClientV5 extends DummySearchClient
  ? T['v5']
  : ReturnType<typeof algoliasearch> extends DummySearchClientV4
  ? T['v4']
  : T['v3'];

type DefaultSearchClient = PickForClient<{
  // @ts-ignore
  v3: ReturnType<typeof algoliasearch>;
  // @ts-ignore
  v4: ReturnType<typeof algoliasearch>;
  // @ts-ignore
  v5: ClientV5;
}>;

export type SearchOptions = PickForClient<{
  // @ts-ignore
  v3: AlgoliaSearch.QueryParameters;
  // @ts-ignore
  v4: ClientSearch.SearchOptions;
  v5: NonNullable<
    // @ts-ignore
    ClientSearch.LegacySearchMethodProps[number]['params']
  >;
}>;

export type SearchResponse<T> = PickForClient<{
  // @ts-ignore
  v3: AlgoliaSearch.Response<T> & {
    appliedRelevancyStrictness?: number;
    nbSortedHits?: number;
    renderingContent?: {
      facetOrdering?: {
        facets?: {
          order?: string[];
        };
        values?: {
          [facet: string]: {
            order?: string[];
            sortRemainingBy?: 'count' | 'alpha' | 'hidden';
          };
        };
      };
    };
  };
  // @ts-ignore
  v4: ClientSearch.SearchResponse<T>;
  // @ts-ignore
  v5: ClientSearch.SearchResponse; // TODO: should be generic
}>;

export type SearchResponses<T> = PickForClient<{
  // @ts-ignore
  v3: AlgoliaSearch.MultiResponse<T>;
  // @ts-ignore
  v4: ClientSearch.MultipleQueriesResponse<T>;
  // @ts-ignore
  v5: ClientSearch.SearchResponses; // TODO: should be generic
}>;

export type SearchForFacetValuesResponse = PickForClient<{
  // @ts-ignore
  v3: AlgoliaSearch.SearchForFacetValues.Response;
  // @ts-ignore
  v4: ClientSearch.SearchForFacetValuesResponse;
  // @ts-ignore
  v5: ClientSearch.SearchForFacetValuesResponse;
}>;

export type FindAnswersOptions = PickForClient<{
  v3: any;
  // @ts-ignore
  v4: ClientSearch.FindAnswersOptions;
  v5: any;
}>;

export type FindAnswersResponse<T> = PickForClient<{
  v3: any;
  // @ts-ignore
  v4: ClientSearch.FindAnswersResponse<T>;
  v5: any;
}>;

export interface SearchClient {
  search: DefaultSearchClient['search'];
  searchForFacetValues?: DefaultSearchClient extends {
    searchForFacetValues: unknown;
  }
    ? DefaultSearchClient['searchForFacetValues']
    : never;
  initIndex?: DefaultSearchClient extends { initIndex: unknown }
    ? DefaultSearchClient['initIndex']
    : never;
  addAlgoliaAgent?: DefaultSearchClient['addAlgoliaAgent'];
}
