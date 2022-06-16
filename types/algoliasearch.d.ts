// Note: Below, we will be importing all algoliasearch v3,4,5 types.
// The goal is being able to export the algoliasearch-helper types using
// the version of the client installed by the developer.

// @ts-ignore
import type algoliasearch from 'algoliasearch/lite';
// @ts-ignore
import type * as AlgoliaSearchLite from 'algoliasearch/lite';
// @ts-ignore
import type * as ClientSearch from '@algolia/client-search';
// @ts-ignore
import type * as AlgoliaSearchLiteV5 from '@experimental-api-clients-automation/algoliasearch-lite';
// @ts-ignore
import type * as AlgoliaSearchFullV5 from '@experimental-api-clients-automation/algoliasearch';
// @ts-ignore
import * as ClientSearchV5 from '@experimental-api-clients-automation/client-search';

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
type ClientFullV5 = ReturnType<typeof AlgoliaSearchFullV5.algoliasearch>;
type ClientV5 = AnyToUnknown<ClientLiteV5 extends DummySearchClient
  ? ClientLiteV5
  : ClientFullV5>;

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
  v3: AlgoliaSearchLite.QueryParameters;
  // @ts-ignore
  v4: ClientSearch.SearchOptions;
  v5: NonNullable<
    // @ts-ignore
    ClientSearchV5.LegacySearchMethodProps[number]['params']
  >;
}>;

export type SearchResponse<T> = PickForClient<{
  // @ts-ignore
  v3: AlgoliaSearchLite.Response<T>;
  // @ts-ignore
  v4: ClientSearch.SearchResponse<T>;
  // @ts-ignore
  v5: ClientSearchV5.SearchResponse; // TODO: should be generic
}>;

export type SearchForFacetValuesResponse = PickForClient<{
  // @ts-ignore
  v3: AlgoliaSearchLite.SearchForFacetValues.Response;
  // @ts-ignore
  v4: ClientSearch.SearchForFacetValuesResponse;
  // @ts-ignore
  v5: ClientSearchV5.SearchForFacetValuesResponse;
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
