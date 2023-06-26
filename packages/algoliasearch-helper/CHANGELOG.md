## 3.13.3 (2023-06-21)
 * chore: introduce git-blame-ignore-revs file https://github.com/algolia/algoliasearch-helper-js/commit/d92f194463479cb40287964b72922bbb1bf91e3a
 * chore(devDeps): remove lodash.keyBy (#945) https://github.com/algolia/algoliasearch-helper-js/commit/96daa3185de4f4f8076cd652f832798ba99db40a
 * chore(lint): format using prettier (#948) https://github.com/algolia/algoliasearch-helper-js/commit/cc83731fc794a45d05b915e7419c59f25eb812c5
 * chore(tools): update eslint and make all rules pass (#947) https://github.com/algolia/algoliasearch-helper-js/commit/8e5995a55ba0a51b05373caa156834fdf20d4c7a
 * docs(html): no indentation after markdown-in-html (#944) https://github.com/algolia/algoliasearch-helper-js/commit/95f2dc4b469f45ebe27e386b91ff3e9ec97921ef
 * fix(getFacetValues): ignore `rootPath` for hierarchical facets (#949) https://github.com/algolia/algoliasearch-helper-js/commit/deb5dafbe7ffb2c53d7c227ae236592ec9a9e02d
 * test(unit): add retry mechanism (#946) https://github.com/algolia/algoliasearch-helper-js/commit/40a0ee1390478b64f574e9edac0b7400152aff84

## 3.13.2 (2023-06-14)
 * fix(types): improve conditional for client version (#943) https://github.com/algolia/algoliasearch-helper-js/commit/6c2218508361c8a4130426a22ac4302328ba86ad

## 3.13.1 (2023-06-12)
 * docs(site): follow-up improvements  (#939) https://github.com/algolia/algoliasearch-helper-js/commit/6a36194d425b2446c6406e74df75c87bf5028454
 * docs: upgrade and simplify tools (#937) https://github.com/algolia/algoliasearch-helper-js/commit/19ccf0b5e6ea00272223f998b05bd3c8f2d904d6
 * docs: upgrade and simplify tools (#937) https://github.com/algolia/algoliasearch-helper-js/commit/d352cc46d506448b9802e3daa756ff1e9e873886
 * fix(SearchResults): use empty facets object for exclusion when results are artificial (#940) https://github.com/algolia/algoliasearch-helper-js/commit/a51e8cb37e10c41ca816be1630bab2078980947b

## 3.13.0 (2023-05-03)
 * chore: delete renovate (#936) https://github.com/algolia/algoliasearch-helper-js/commit/0e3d8cff722d4a91a04251533636f0860ef3828c
 * feat(DerivedHelper): skip request for empty index (#938) https://github.com/algolia/algoliasearch-helper-js/commit/79caa4b0ca2537c0f4431ee11556464031935436

## 3.12.0 (2023-03-03)
 * feat(types): add `queryAfterRemoval` to `SearchResults` (#934) https://github.com/algolia/algoliasearch-helper-js/commit/4fb5a0345f0cf438fb026d8010faf843bd3b0a01

## 3.11.3 (2023-01-23)
 * chore(tests): remove remaining lodash usage (#927) https://github.com/algolia/algoliasearch-helper-js/commit/e234837aaa10e6458d06085ff9938c741ee74d4b
 * fix(getFacetValues): reflect the value of _state in hierarchicalFacetValues (#925) https://github.com/algolia/algoliasearch-helper-js/commit/4d093b464e62dc6963dc6676aee19ff78145f48a
 * test(integration): refactor to speed up (#926) https://github.com/algolia/algoliasearch-helper-js/commit/2c9ffeb23d68a09ac78a29d2a53024d9f724d525

## 3.11.2 (2023-01-09)
 * feat: update Algolia logo (#918) https://github.com/algolia/algoliasearch-helper-js/commit/58e0e588195dde8f411383ad248bd112a9c01eb5
 * fix: prevent prototype pollution in rare error-cases (#923) https://github.com/algolia/algoliasearch-helper-js/commit/7ae16eaa3f5732b96f1fa40973778c5494e77b89, closes https://github.com/algolia/algoliasearch-helper-js/issues/922
 * fix(answers): deprecate findAnswers (#919) https://github.com/algolia/algoliasearch-helper-js/commit/07118610d3da07d04390d7b79e857122e98a3db5

## 3.11.1 (2022-09-12)
 * fix(facetValues): use existing facet filters in multi queries for hierarchical facet values (#915) https://github.com/algolia/algoliasearch-helper-js/commit/bae388c7143653e74628dbd3c72979a51be6ab7f

## 3.11.0 (2022-08-03)
 * feat(typing): Update SearchResults hits, expose optional hit typings (#914) https://github.com/algolia/algoliasearch-helper-js/commit/bf4c4c6cdc84a5b9d8daff60d591a419df01beed

## 3.10.0 (2022-06-27)
 * feat(disjunctiveFacetParams): reduce payload size (#912) https://github.com/algolia/algoliasearch-helper-js/commit/95185750fb05e82c06d3ddd9e907f06ce66d0317
 * feat(types): support algoliasearch v5 (#910) https://github.com/algolia/algoliasearch-helper-js/commit/524272a2fe62c852d9ed8d0cd698cc184897b9c5

## 3.9.0 (2022-06-20)
 * feat(searchForFacetValues): fall back to client.search if it's present (#906) https://github.com/algolia/algoliasearch-helper-js/commit/d9ebb01382ec83e0c579c393c3e9df83a9261699
 * fix(requests): send a sorted object of parameters (#911) https://github.com/algolia/algoliasearch-helper-js/commit/832507fae48c54ab41d3241254753100bb86910b

## 3.8.3 (2022-06-15)
 * chore: update yarn lockfile (#909) https://github.com/algolia/algoliasearch-helper-js/commit/e561c35ce30dc36c162886b828835bf18887dab1
 * doc(readme): fix api parameter links (#904) https://github.com/algolia/algoliasearch-helper-js/commit/64356a40bd88972bcd256acb5c6f483982d4557d, closes https://github.com/algolia/algoliasearch-helper-js/issues/904
 * fix(facetValues): retrieve all hierarchical facet parent values (#908) https://github.com/algolia/algoliasearch-helper-js/commit/420111b29f82fe3af8e5861a977f024a61f4025f

## 3.8.2 (2022-04-08)
 * fix(types): correct type for addTag (#903) https://github.com/algolia/algoliasearch-helper-js/commit/ca82ef302ceff8e0e31767c90e2f272914c703af

## 3.8.1 (2022-04-05)
 * fix(disjunctiveFacets): avoid escaping non-string values (#902) https://github.com/algolia/algoliasearch-helper-js/commit/4ac67bda2a8e5a2b8c53c960637b72a77951af76

## 3.8.0 (2022-04-04)
 * ci(codesandbox): set up (#899) https://github.com/algolia/algoliasearch-helper-js/commit/ac7de4458f31c01da4e682cabee357e6300e147a
 * ci(typescript): run type tests in CI (#898) https://github.com/algolia/algoliasearch-helper-js/commit/4d45118ef64a8c6352d2e75618df4e18a149ba64
 * feat(facetValues): offer escaped value (#889) https://github.com/algolia/algoliasearch-helper-js/commit/4bae51bdefd217f3ef9ab9bf02fb653f3b8ae643

## 3.7.4 (2022-03-21)
 * fix(type): implement correctly https://github.com/algolia/algoliasearch-helper-js/commit/1c8670b21a507024d2ddf797feae5bb15343c244

## 3.7.3 (2022-03-18)
 * fix(ts): remove stray comment https://github.com/algolia/algoliasearch-helper-js/commit/24fe8de4bebc74500b33c95b124500b8499ef588

## 3.7.2 (2022-03-18)
 * chore(docs): fix capitalization of Github and npm https://github.com/algolia/algoliasearch-helper-js/commit/5babbcad0b3d406a0b56f7a55682ff169e2b853f
 * fix(results): implement search result options via an argument https://github.com/algolia/algoliasearch-helper-js/commit/4e6ac6926bd284c7eafe060480fc4258844d121a

## 3.7.1 (2022-03-17)
 * docs(readme): fixed angular.js example link (#885) https://github.com/algolia/algoliasearch-helper-js/commit/c16287e6685040a3786b8d0bac0922cdc583134e, closes https://github.com/algolia/algoliasearch-helper-js/issues/885
 * fix(types): allow "__isArtificial" (#890) https://github.com/algolia/algoliasearch-helper-js/commit/1e2aef0fb8aa88c80b985ef009bff5a3dd71ca80

## 3.7.0 (2021-12-13)
 * feat(events): move to @algolia/events (#883) https://github.com/algolia/algoliasearch-helper-js/commit/0c33fdc0063d7486db71ba0c6952339dc8b93ae5

## 3.6.2 (2021-10-19)
 * fix(SearchParameters): ignore invalid parameters (#880) https://github.com/algolia/algoliasearch-helper-js/commit/4ff542b70b92a6b81cce8b9255700b0bc0817edd

## 3.6.1 (2021-10-15)
 * fix(facetOrdering): make sure ordered facets is a dense array (#879) https://github.com/algolia/algoliasearch-helper-js/commit/990f8bc133dd379c457c52f750a87944e2f2924c

## 3.6.0 (2021-10-08)
 * ci(circle): update node image (#875) https://github.com/algolia/algoliasearch-helper-js/commit/36484631c25e9d286b1d2d73cf3a388d4dba2587
 * feat(facets): when * is present, only send that parameter (#874) https://github.com/algolia/algoliasearch-helper-js/commit/fc183ec2910d4ba33067b3487f3a70e940fd24d3

## 3.5.5 (2021-07-30)
 * feat(ts): allow showParentLevel in hierarchicalFacet https://github.com/algolia/algoliasearch-helper-js/commit/cef547d8f48bf2cdb2d28476f8d3715c1b1a40d8

## 3.5.4 (2021-07-05)
 * fix(facetOrdering): facetOrdering.facets, not facetOrdering.facet https://github.com/algolia/algoliasearch-helper-js/commit/97d769adf68458a04605ca7ac0e35ade5c4bc646

## 3.5.3 (2021-06-14)
 * fix(ts): correct required for getFacetValues https://github.com/algolia/algoliasearch-helper-js/commit/55a909fe1ef892b3e76ddc109155336c77875292

## 3.5.2 (2021-06-14)
 * fix(facetOrdering): hierarchical attributes sort by path https://github.com/algolia/algoliasearch-helper-js/commit/c1d9764b7ed9492356a8b9ccfdb980fe0361c46f

## 3.5.1 (2021-06-14)
 * fix(ts): correctly optional renderingContent https://github.com/algolia/algoliasearch-helper-js/commit/41d27f8336f48dd2eaec53afafcceb81a58d0dfb

## 3.5.0 (2021-06-14)
 * feat(getFacetValues): process facetOrdering (#822) https://github.com/algolia/algoliasearch-helper-js/commit/8c7ff444407cc7855c4d76b15954f4a6864d0b5d

## 3.4.5 (2021-06-10)
 * feat(ts): document renderingContent (#823) https://github.com/algolia/algoliasearch-helper-js/commit/7b176a7bbc38de193ac1c6a34dacde63059e4b3b

## 3.4.4 (2021-02-16)
 * fix(ts): add rootPath to HierarchicalFacet https://github.com/algolia/algoliasearch-helper-js/commit/06fb959f119cc0e7b91268154c01e0f6f4aa3ba1

## 3.4.3 (2021-02-15)
 * docs(examples): remove frameworks https://github.com/algolia/algoliasearch-helper-js/commit/c71f9c5210dcd140a9ac9b350047da75bcda7c77
 * fix(ts): correct type for HierarchicalFacet parameter (#811) https://github.com/algolia/algoliasearch-helper-js/commit/3b705dd4b22aa57c0ecd6533ea515fdafa7fd5f9

## 3.4.2 (2021-02-10)
 * fix(types): add relevancyStrictness to SearchParameters (#810) https://github.com/algolia/algoliasearch-helper-js/commit/3860179c63c31bce0df82337d4000c7449ef516a

## 3.4.1 (2021-02-10)
 * chore: update yarn.lock https://github.com/algolia/algoliasearch-helper-js/commit/4f9360cf069d2fb4bffc16661b6f8eed46ec19c4
 * fix(ts): add types for smart sort (#809) https://github.com/algolia/algoliasearch-helper-js/commit/236822e0f041ecb2e926740cff7e6ecdadccc604
 * fix(ts): make queryID optional (#806) https://github.com/algolia/algoliasearch-helper-js/commit/67ad89bace2b3795a4d4281f97b4edf557b6903d

## 3.4.0 (2021-01-12)
 * feat(answers): add `findAnswers` (#804) https://github.com/algolia/algoliasearch-helper-js/commit/4635dd5b911713be7d2a868a79f9150b7bd175bd

## 3.3.4 (2020-12-09)
 * fix: ignore invalid userToken (#802) https://github.com/algolia/algoliasearch-helper-js/commit/a2876c59fb7bdf7bd564c727bc70e7514362e189

## 3.3.3 (2020-12-02)
 * fix(removeNumericRefinement): clear empty refinements (#801) https://github.com/algolia/algoliasearch-helper-js/commit/844f7d787de4897f17ebd5982f20316d7cb75a7d

## 3.3.2 (2020-11-19)
 * fix(ts): add queryLanguages to parameters https://github.com/algolia/algoliasearch-helper-js/commit/51f544855a38031e36c70e3c9b2212446cc4a1fa
 * fix(ts): add searchWithoutTriggeringOnStateChange https://github.com/algolia/algoliasearch-helper-js/commit/fb91e277325fa7c6c534370323dc2bdaee590b6d
 * fix(ts): correct type for clearCache https://github.com/algolia/algoliasearch-helper-js/commit/684d5c02f54de51512c282117c70d86cf09ba098
 * fix(ts): detailed type for facet.stats https://github.com/algolia/algoliasearch-helper-js/commit/234cb19d0f8bf98a490b8e3d9042c9e0317b69e7

## 3.3.1 (2020-11-19)
 * fix(setup): run postinstall only locally https://github.com/algolia/algoliasearch-helper-js/commit/9df09e465a3fff44bc3737b6660a076df0aebeec

## 3.3.0 (2020-11-19)
 * chore(dev): replace github dependency metalsmith-in-place (#796) https://github.com/algolia/algoliasearch-helper-js/commit/3eb8d39c4598bbf0a19ab85a9d07e2cc1e474be8
 * feat(ts): fill in more of the types https://github.com/algolia/algoliasearch-helper-js/commit/34ae5cd58977fa3c935ae74aa43b5049c9e6a6f9
 * fix(ts): correct type for getNumericRefinements (#800) https://github.com/algolia/algoliasearch-helper-js/commit/0920d945b09134b0b2ef7e5ccf7a71947504f9f0

## 3.2.2 (2020-07-30)
 * chore(deps): update dependency lodash to v4.17.19 [security] (#785) https://github.com/algolia/algoliasearch-helper-js/commit/c6e03cb6f66d21192a00c04e2c4dcbda71c6dde5, closes https://github.com/algolia/algoliasearch-helper-js/issues/785
 * docs: fix "bellow" typo in d.ts file comment (#788) https://github.com/algolia/algoliasearch-helper-js/commit/1a8f54adde525c852d37fc87feb0deb3d9939d53, closes https://github.com/algolia/algoliasearch-helper-js/issues/788
 * fix(insideBoundingBox): prevent invalid parameter from throwing (#787) https://github.com/algolia/algoliasearch-helper-js/commit/ba5ef685a4263cba154de30e2b1bd335fe5982e2, closes https://github.com/algolia/algoliasearch-helper-js/issues/787
 * fix(ts): use a dedicated key to determine client version (#789) https://github.com/algolia/algoliasearch-helper-js/commit/deb4f4fa1f154fb7c437b5c7352bb9f5ca39b2bd, closes https://github.com/algolia/algoliasearch-helper-js/issues/789

## 3.2.1 (2020-07-23)
 * fix(defaultsPure): fix the regression where the order was wrong with addFacetRefinement (#786) https://github.com/algolia/algoliasearch-helper-js/commit/b54fddb9196b2dc19b6c259306262f2e1da2cf78, closes https://github.com/algolia/algoliasearch-helper-js/issues/786

## 3.2.0 (2020-07-21)
 * chore(deps): pin dependencies (#763) https://github.com/algolia/algoliasearch-helper-js/commit/3e755eb780d0258e6c5060f7112df785db63f6b5
 * docs(readme): remove URL helpers from TOC https://github.com/algolia/algoliasearch-helper-js/commit/c49bf5398f77c7a185241777a213daf4bd27fcf7
 * fix: accept all fields implicitly instead of the allow list (#779) https://github.com/algolia/algoliasearch-helper-js/commit/89a7aab6d0189fcc963832e418399aad98c159ec

## 3.1.2 (2020-06-02)
 * fix(defaultsPure): don't change keys order, fix #761 (#762) https://github.com/algolia/algoliasearch-helper-js/commit/6b835ffd07742f2d6b314022cce6848f5cfecd4a, closes https://github.com/algolia/algoliasearch-helper-js/issues/761 https://github.com/algolia/algoliasearch-helper-js/issues/762
 * fix(types): add `resetPage` state method (#773) https://github.com/algolia/algoliasearch-helper-js/commit/e2a88a169d3b82f4fd756cb4b0e9317d5bcc6b9e
 * fix(typescript): fix TypeScript 3.9 compatibility (#775) https://github.com/algolia/algoliasearch-helper-js/commit/c83c501938e803ca9fa74601dcd1ed896583ac0e, closes https://github.com/algolia/algoliasearch-helper-js/issues/775 https://github.com/algolia/algoliasearch-helper-js/issues/774

## 3.1.1 (2020-02-21)
 * fix: fix omit calls to pass excluded value as an array (#760) https://github.com/algolia/algoliasearch-helper-js/commit/dd375ab18513336817bd8d5d78341ac33ae94954, closes https://github.com/algolia/algoliasearch-helper-js/issues/760

## 3.1.0 (2020-01-21)
 * chore(types): add `sumOrFiltersScores` search parameter (#753) https://github.com/algolia/algoliasearch-helper-js/commit/68ce2dba40fa1284f9a5b93aa6ce42c16d1b1ea1
 * feat(algoliasearch): add support for algoliasearch v4 the helper v3 (#756) https://github.com/algolia/algoliasearch-helper-js/commit/67407a0dfd99402bc1a77bd005385633c3881624
 * fix(types): add `optionalFilters` search parameter (#754) https://github.com/algolia/algoliasearch-helper-js/commit/faba4d7f52abae1c18f1023a03c41cfb5cffefb0

## 3.0.0 (2019-11-18)
 *  fix(merge): change implementation  (#716) https://github.com/algolia/algoliasearch-helper-js/commit/29c213853de49e4f2a36d9c95886ddb13237047e
 * chore: mention remaining changes https://github.com/algolia/algoliasearch-helper-js/commit/f756947a6b879869b3672360d0bff6ebada88540
 * chore(deps): update circleci/node:8.15.1 docker digest to ef1a0c4 (#715) https://github.com/algolia/algoliasearch-helper-js/commit/f4dab89dcce68d46596d5b8a5e88f18f28b13330
 * chore(lodash): remove _.omit (#655) https://github.com/algolia/algoliasearch-helper-js/commit/7db8b4ccf8a495a027b084765117fe9fb0e7791d
 * chore(lodash): remove lodash from dependency list (#705) https://github.com/algolia/algoliasearch-helper-js/commit/a63ec6bae1fc240d38a9293a5062911985f20109, closes https://github.com/algolia/algoliasearch-helper-js/issues/552
 * chore(release): allow canary release (#712) https://github.com/algolia/algoliasearch-helper-js/commit/3eb087ca887b3d1a8115d95a54807602232d1d4c
 * chore(removeHierarchicalFacetRefinement): remove error if not refined (#747) https://github.com/algolia/algoliasearch-helper-js/commit/e68ecfe9897e630443ce72618a832291c0151df8
 * chore: merge develop into master (#750) https://github.com/algolia/algoliasearch-helper-js/commit/53c7c62f239bc53174bae79ec84812776da582dc
 * chore: remove Bower support (#711) https://github.com/algolia/algoliasearch-helper-js/commit/e7518e224ecb8af5f792746dbf250cd433caa7c0
 * chore(ts): add methods https://github.com/algolia/algoliasearch-helper-js/commit/d051f79c9b3233318929e90c8d9908860889c348
 * chore(ts): add ruleContexts to SP https://github.com/algolia/algoliasearch-helper-js/commit/4bdc4a404ae9289253244939622f541342c0e0b8
 * chore(ts): add searchOnlyWithDerivedHelpers (#739) https://github.com/algolia/algoliasearch-helper-js/commit/c6aa31b027d5bf07bc7fa6f5ba158effe7881152
 * chore(ts): publish definition file too https://github.com/algolia/algoliasearch-helper-js/commit/181346222733ea4b5bafe5b0b776640b9bc0bdcd
 * chore(TS): isNumericRefined has only one required argument https://github.com/algolia/algoliasearch-helper-js/commit/cac8fc36943b72ae1d65bd8eda7c0e9b9e0a92aa
 * chore(warn): remove unused function (lodash.bind) (#682) https://github.com/algolia/algoliasearch-helper-js/commit/c59b7e3b6411b86d5171f4646e8bbb553d65b87c
 * chore: update release command https://github.com/algolia/algoliasearch-helper-js/commit/0989880eb0e3e7776d687bb3da5107daa4860477
 * docs: add link to wiki https://github.com/algolia/algoliasearch-helper-js/commit/3598f2a90020e708cbc1823777019aafd66f4c65
 * docs: update event signature (#701) https://github.com/algolia/algoliasearch-helper-js/commit/bbe4634ebc77ef4cf6c7362ecebc84d9b43dc152
 * docs(migration): mention changed methods (#732) https://github.com/algolia/algoliasearch-helper-js/commit/f95e6801e173434ebc3009e07057e9de2c988105
 * docs(next): add migration guide https://github.com/algolia/algoliasearch-helper-js/commit/8430137ecd5a53d69075ce61968181ad61d6981d
 * docs(serverUsed): mention getRankingInfo (#706) https://github.com/algolia/algoliasearch-helper-js/commit/f258c2a72fd316f6306df7383242a022004b98b6, closes https://github.com/algolia/algoliasearch-helper-js/issues/500
 * feat: implement dedicated reset page method (#673) https://github.com/algolia/algoliasearch-helper-js/commit/666501eb4149c1f0558ef1cdeb8239fc1bdc2d2f
 * feat(getState): remove "filter" option (#707) https://github.com/algolia/algoliasearch-helper-js/commit/ac527915fee3dfaf29dce26fcedb5a8c7e2007b7
 * feat(getState): remove getState (#708) https://github.com/algolia/algoliasearch-helper-js/commit/7de698cfa9fa9518e3a40cdb2caa34da7e9ba52e
 * feat(requestBuilder): prevent needless extra requests for empty refinements (#737) https://github.com/algolia/algoliasearch-helper-js/commit/db0a3929ab236f0435a81544ca721dd6b9f9319a
 * feat(search): allow the search only with Derived Helpers (#704) https://github.com/algolia/algoliasearch-helper-js/commit/aa128fc928a999438b8efaad050170f812f85b33
 * feat(SearchParameters): avoid undefined values (#703) https://github.com/algolia/algoliasearch-helper-js/commit/9757e0a78d8e6fec64999e45d4452019d4a13a8f
 * feat(typescript): move typings inline (#719) https://github.com/algolia/algoliasearch-helper-js/commit/a12272ead5ba87b32c1b8528deeeae555ace26e3
 * fix(defaults): remove const https://github.com/algolia/algoliasearch-helper-js/commit/48a0c488a966c02230caf51c07e20b5cbf7a10d0
 * fix(errors): remove isRefined (#731) https://github.com/algolia/algoliasearch-helper-js/commit/5761885f9b2f1f505d27cfce7f3845a0d5a7bbba
 * fix(getConjunctiveRefinements): no error when requested facet is not conjunctive (#724) https://github.com/algolia/algoliasearch-helper-js/commit/cf852e7d8741f2a7f675deacaf0c4f6d3cc0ad4f
 * fix(getDisjunctiveRefinements): remove error (#725) https://github.com/algolia/algoliasearch-helper-js/commit/211e390fd73b0fedecded5e64f29630c44fa15e5
 * fix(getExcludeRefinements): replace error by default value (#726) https://github.com/algolia/algoliasearch-helper-js/commit/9d7ae871d6b4bec9117e69b90fc7bfa53e6cb3c1
 * fix(getFacetStats): remove error (#721) https://github.com/algolia/algoliasearch-helper-js/commit/96b6ec8552289eca0ac484c04b303fe2c8bc1af8
 * fix(getFacetValues): don't throw error when there's no facet (#720) https://github.com/algolia/algoliasearch-helper-js/commit/e15e39e88c7599b8ff92754fdee86d5ba4a1e44f
 * fix(getHierarchicalFacetBreadcrumb): don't throw an error (#723) https://github.com/algolia/algoliasearch-helper-js/commit/40e1d61eba366bbfece5945c1693bc04d21427e4
 * fix(isDisjunctiveFacetRefined): return false if not in disjunctiveFacets (#729) https://github.com/algolia/algoliasearch-helper-js/commit/13ec09bff8bbefcc1ad3200cd196c8832c816eca
 * fix(isExcludeRefined): remove error in favor of false (#728) https://github.com/algolia/algoliasearch-helper-js/commit/3f0ab6b4800181d4b20ac9dae856ed480ef90001
 * fix(isFacetRefined): return false if facet isn't declared (#727) https://github.com/algolia/algoliasearch-helper-js/commit/7151f56e4be9e71ef8b1427b2746f11b1edfb2f8
 * fix(isHierarchicalFacetRefined): return false if refinement isn't a facet (#730) https://github.com/algolia/algoliasearch-helper-js/commit/89fa01087201290b4d26aa6a0780d0b505d17622
 * fix(lodash/intersection): replace with custom implementation (#718) https://github.com/algolia/algoliasearch-helper-js/commit/00dfb4e67fc3b343ec96321b1cb5dd527d074419
 * fix(removeXFacet): make sure this fully removes empty arrays (#743) https://github.com/algolia/algoliasearch-helper-js/commit/ea5a22a8afd64d9c68279a4aff284a1a5c023835
 * fix(results): remove lodash looping over objects (#648) https://github.com/algolia/algoliasearch-helper-js/commit/bb025c27aa1af7c31763970151f90b7bb401b164, closes https://github.com/algolia/algoliasearch-helper-js/issues/258
 * fix(sortBy): compare whole prefix instead of first character (#702) https://github.com/algolia/algoliasearch-helper-js/commit/b85fb502ea48d0142a1400887bf353645ab5fbda, closes https://github.com/algolia/algoliasearch-helper-js/issues/702
 * fix(toggleRefinement): keep an empty array when clearing (#738) https://github.com/algolia/algoliasearch-helper-js/commit/5b3fc1189c93c480b3de5cdd0e37c8b86edfb89a
 * fix(types): add state.removeNumericRefinement (#742) https://github.com/algolia/algoliasearch-helper-js/commit/e58c24ab5a858698ef27bd50c9f2d7ee93d6dd53
 * refactor(addAgent): remove duplicate code (#657) https://github.com/algolia/algoliasearch-helper-js/commit/d023efd5651c63042d2b690863decf55ca92dbcf
 * refactor(error): use object vs list of arguments (#700) https://github.com/algolia/algoliasearch-helper-js/commit/722ecebd4bea277417483dc6f468af549813d912
 * refactor(lodash): compact (#689) https://github.com/algolia/algoliasearch-helper-js/commit/284efa53b12400359dc1e3f6c9f75be7b2ac7929
 * refactor(lodash): forOwn (#697) https://github.com/algolia/algoliasearch-helper-js/commit/eae367ade72d685bed0873c5396926559c42de30
 * refactor(lodash): intersection (#696) https://github.com/algolia/algoliasearch-helper-js/commit/25822a54dc5754cc1e53b6ff12261afb1d51c709
 * refactor(lodash): map & trim (#679) https://github.com/algolia/algoliasearch-helper-js/commit/357fcb7cf1e2e413056d5079694efc20d3fe7ac0
 * refactor(lodash): merge (#694) https://github.com/algolia/algoliasearch-helper-js/commit/92bced44cffc91bad70fc39a1e85590e50c4ff36
 * refactor(lodash): partial & partialRight (#693) https://github.com/algolia/algoliasearch-helper-js/commit/7ceea2fe4d5fd4c0591a19e1b4cddea5d9cecebc
 * refactor(lodash): remove filter (#685) https://github.com/algolia/algoliasearch-helper-js/commit/249d2e67f70569ce4f1ad67add50133fb4a6dc7c
 * refactor(lodash): remove flatten (#695) https://github.com/algolia/algoliasearch-helper-js/commit/9da0e0864ade382a22035c23191f2cc0631b0c75
 * refactor(lodash): remove forEach (#674) https://github.com/algolia/algoliasearch-helper-js/commit/8c93765963fa115b0ff01f7125a0df7d7960b5e2
 * refactor(lodash): remove reduce (#678) https://github.com/algolia/algoliasearch-helper-js/commit/7907805fd5e1319aeb0d2d6cf236e2298e2f8ff4
 * refactor(lodash): remove simple functions (#656) https://github.com/algolia/algoliasearch-helper-js/commit/c309ffa03b4e13023b4595da48aaea0f895e555d
 * refactor(lodash): remove startsWith (#690) https://github.com/algolia/algoliasearch-helper-js/commit/bb00933bc30c0ff9bb6126e644d409ad59e205e5
 * refactor(lodash): replace "defaults" with pure alternative (#692) https://github.com/algolia/algoliasearch-helper-js/commit/ee0713242f2ad80ffb5d280803e2e2fd829b12ea
 * refactor(lodash): replace find & findIndex (#687) https://github.com/algolia/algoliasearch-helper-js/commit/92e7c2368fe4c45e7b10fb8be86b85516e2a7c8c
 * refactor(lodash): replace orderBy (#698) https://github.com/algolia/algoliasearch-helper-js/commit/bb2b31e6cce7ef1dbb42757872cc9a18c3155a8e
 * refactor(lodash): sumBy (#688) https://github.com/algolia/algoliasearch-helper-js/commit/a538bd9783b0acff5877be40ffb9c41c8c714856
 * refactor(result): use object vs list of arguments (#699) https://github.com/algolia/algoliasearch-helper-js/commit/643f18eadda9d0a530578fa79dee19cb42303576
 * refactor(search): emit object (#683) https://github.com/algolia/algoliasearch-helper-js/commit/46c7d7d16ce3b7b4fab54ca6ec7a1b5be81ae4e6
 * refactor(searchForFacetValues): use object vs list of arguments (#684) https://github.com/algolia/algoliasearch-helper-js/commit/ab8e9c5dd1c774bd4263f65fa60b0278281e699a
 * refactor: remove getQueryParameter (#713) https://github.com/algolia/algoliasearch-helper-js/commit/d9dfac4742b405904c36d03f4d8fdd876c185d6b
 * refactor(searchOnce): use object vs list of arguments (#681) https://github.com/algolia/algoliasearch-helper-js/commit/42b40d38ce363afbf711c522cc536ac84fad7987
 * refactor(SearchParameters): removes default values (#670) https://github.com/algolia/algoliasearch-helper-js/commit/b15696be08dfc7df739ec83e2f57f777e58727eb
 * refactor(url): remove url helpers (#652) https://github.com/algolia/algoliasearch-helper-js/commit/52e22f464a903a674ff714cc4f914c458b53a973
 * test(sffv): no longer test impossible responses (#686) https://github.com/algolia/algoliasearch-helper-js/commit/fd878e8f9de65ef18926f86460fe1a4e49b77e20


### BREAKING CHANGE

* getState(filters) is replaced my manually filtering the returned object
* removed helper.isRefined, use helper.hasRefinements instead
* SearchParameters.filter is removed

* doc(filter): remove reference
* use helper.state instead of helper.getState()
## 2.28.0 (2019-05-07)
 * fix(results): revert changes done in #648
    * this will come back in the next major version, but has breaking changes for now

## 2.27.0 (2019-04-12)
 * chore(deps): update dependency algolia-frontend-components to v0.0.35 (#605) https://github.com/algolia/algoliasearch-helper-js/commit/41043af49af79752cb9414dcbbc33af7bb98c4a6
 * chore(deps): update dependency algoliasearch to v3.32.0 (#628) https://github.com/algolia/algoliasearch-helper-js/commit/e5cab52b1d925fc706d3754c0441dc6bc292ff8c
 * chore(deps): update dependency babel-core to v6.26.3 (#581) https://github.com/algolia/algoliasearch-helper-js/commit/051075c2d0512502d0dd5db12f646d075ea18174
 * chore(deps): update dependency browserify to v14.5.0 (#582) https://github.com/algolia/algoliasearch-helper-js/commit/66e2a79971bee4cc748e5c897c469736e779ad3d
 * chore(deps): update dependency handlebars to v4.1.0 (#589) https://github.com/algolia/algoliasearch-helper-js/commit/bf1c4936b125d526fd57ea0fed9fd29413891d82
 * chore(deps): update dependency http-server to v0.11.1 (#590) https://github.com/algolia/algoliasearch-helper-js/commit/673ee5f2b0688ae30731b5bcb615ebb5849d6c8a
 * chore(deps): update dependency mversion to v1.13.0 (#630) https://github.com/algolia/algoliasearch-helper-js/commit/1304f198cc2f4df6dc2a3b9cd74c1b2f493689b1
 * chore(deps): update dependency rimraf to v2.6.3 (#596) https://github.com/algolia/algoliasearch-helper-js/commit/5e178300f8cfb9d1c12643412f2f74a151f5b033
 * chore: use only yarn (no more npm 👩‍🚒) (#637) https://github.com/algolia/algoliasearch-helper-js/commit/dba85a0485aad0507622ae13eecb981d3071bd91
 * chore(deps): update st (#625) https://github.com/algolia/algoliasearch-helper-js/commit/5d7d915331c3b8782114be393171268e5489c6c7
 * chore(docs): change jade to pug (#615) https://github.com/algolia/algoliasearch-helper-js/commit/80a20dcb232bc7139b41161fdf300b87c21e0746, closes https://github.com/algolia/algoliasearch-helper-js/issues/613
 * chore(docs): fix interpolation https://github.com/algolia/algoliasearch-helper-js/commit/dd888f28eb0c89d5e9e77941ca97f2a6483e4461
 * chore(docs): remove folder in `develop` (#616) https://github.com/algolia/algoliasearch-helper-js/commit/7bfc9719bd002b3d2af4f2afbfdc1da7fcfd8d0e
 * docs(init): use toggleFacetRefinement instead (#622) https://github.com/algolia/algoliasearch-helper-js/commit/2461ffe106c2f71018dcb52b6c0b29c6016a35ef
 * docs(instantiate): use existing signature of toggleRefine (#621) https://github.com/algolia/algoliasearch-helper-js/commit/6be5ec14e4b1696aad3a8e8bc4740b88e336bb9b
 * docs: fix InstantSearch link (#640) https://github.com/algolia/algoliasearch-helper-js/commit/2c97a716e32e2b2b7cac0f366346bbe9691f2cf9, closes https://github.com/algolia/algoliasearch-helper-js/issues/640
 * docs: fix typo on hierarchical facets (#646) https://github.com/algolia/algoliasearch-helper-js/commit/ee5b3b40b96290fcd93e36f088309299f30c96b0, closes https://github.com/algolia/algoliasearch-helper-js/issues/646
 * feat(sffv): throw an error if it's called and the client doesn't have the functions (#623) https://github.com/algolia/algoliasearch-helper-js/commit/dd61360cabd24f1baf33e242f4337c0e2245e9fd
 * fix(results): remove lodash looping over objects (#648) https://github.com/algolia/algoliasearch-helper-js/commit/c1f540f1b2b1c24bdd75be61dc7135b07f4ca349, closes https://github.com/algolia/algoliasearch-helper-js/issues/258
 * fix(ua): change the User-Agent to use the new specs lib (version) (#647) https://github.com/algolia/algoliasearch-helper-js/commit/eafd4cfd3e78b49bb5425784bab413f0702cbc04
 * refactor(events): replace util.inherits by inline (#653) https://github.com/algolia/algoliasearch-helper-js/commit/16459aea5e73d7d76f65b2f62567eacdc79c75d7
 * test(client): update index name (#619) https://github.com/algolia/algoliasearch-helper-js/commit/356427456e46b7efeee6a7c143ebb2b0faacc40e
 * Update README.md https://github.com/algolia/algoliasearch-helper-js/commit/ace477e3878e083c5cba20a4bb0c76f265f9c025

## 2.26.1 (2018-06-19)
 * build: Configure Renovate (#579) https://github.com/algolia/algoliasearch-helper-js/commit/95fa18d14b63d70957be49538893aef7d0f93b77
 * chore(deps): update dependency algolia-frontend-components to v0.0.34 (#580) https://github.com/algolia/algoliasearch-helper-js/commit/27470e2868374f7035340974f8e7ddc2c90f80d6
 * chore(deps): update dependency algoliasearch to v3.27.1 (#601) https://github.com/algolia/algoliasearch-helper-js/commit/bbadef3994bf68b4b47c0b9312d8f67ae2c5c619
 * chore(deps): update dependency marked to v0.3.19 (#591) https://github.com/algolia/algoliasearch-helper-js/commit/d5993568ed28fc2e1ee392bb3bb9c8699bd6707f
 * chore(deps): update dependency sinon to v4.5.0 (#599) https://github.com/algolia/algoliasearch-helper-js/commit/c6a0dd2d6bdd3d5b256d6c1b5ad73e3f22371115
 * chore(deps): update dependency tape to v4.9.0 (#603) https://github.com/algolia/algoliasearch-helper-js/commit/e29f2349a982e7e5d8efd9e2bd99d7c280ab9a55
 * doc(params): Add filters to query parameters (#604) https://github.com/algolia/algoliasearch-helper-js/commit/c2e742e48a9093090937bf6abba9fa61227edf9d, closes https://github.com/algolia/algoliasearch-helper-js/issues/528
 * fix(_dispatchAlgoliaResponse): avoid mutate the client response (#611) https://github.com/algolia/algoliasearch-helper-js/commit/d6bd801f3b3dc07ccd31b57947b8086c3fe07195

## 2.26.0 (2018-04-25)
 * chore(deps): pin and upgrade some dependencies (#566) https://github.com/algolia/algoliasearch-helper-js/commit/5edd3b19f8ec115733874bddfb5bf1fa602ceab9
 * chore(yarn.lock): fixed zuul dependency https://github.com/algolia/algoliasearch-helper-js/commit/ad21c56ddf9ec179e87a01560fdaedb70ba844f0
 * feat: Make `addAlgoliaAgent()` and `clearCache()` optional (#577) https://github.com/algolia/algoliasearch-helper-js/commit/220b01323d75202d5531dd56d9b8211ff22b902c
 * refactor(lodash): don't use lodash/isarray (#575) https://github.com/algolia/algoliasearch-helper-js/commit/59736d7d7a3141589fd7b7b2a7d93c67fb0822ff

## 2.25.1 (2018-04-20)
 * fix(sffv): unwrap content when it comes from multi queries (#574) https://github.com/algolia/algoliasearch-helper-js/commit/fcb15d488a27e57b621fa5b26531626353c8bf41

## 2.25.0 (2018-04-18)
 * chore: fix types in doc for getNumericRefinement (#564) https://github.com/algolia/algoliasearch-helper-js/commit/4113b5b6bdaf3a2e008ffecdc11c16fcda34dff9, closes https://github.com/algolia/algoliasearch-helper-js/issues/564 https://github.com/algolia/algoliasearch-helper-js/issues/556
 * chore(test): delete indices at the end of the tests (#570) https://github.com/algolia/algoliasearch-helper-js/commit/d70a9500f5b4eafafe022c4e652536feab152417, closes https://github.com/algolia/algoliasearch-helper-js/issues/560
 * chore: update yarn.lock https://github.com/algolia/algoliasearch-helper-js/commit/afa384441339815d36567bc97125a10f8e9a0a06
 * docs(readme): fix typo (#565) https://github.com/algolia/algoliasearch-helper-js/commit/36eebb4e04b23f36f752aef3d51e3a04457b32d0, closes https://github.com/algolia/algoliasearch-helper-js/issues/565
 * feat(search): Promisify `client.search()` (#571) https://github.com/algolia/algoliasearch-helper-js/commit/d12cbda2bb8ebafdf3d5f9e442378d3efb7353ee
 * feat(sffv): Use client SFFV over index SFFV (#572) https://github.com/algolia/algoliasearch-helper-js/commit/bb17720deed3d6325a28717a9452b278af456582

## 2.24.0 (2018-01-31)
 * feat: make Helper ready for insights https://github.com/algolia/algoliasearch-helper-js/commit/03f8f31931efe1d9913c57066539b4422963f1bc

## 2.23.2 (2017-12-14)
 * fix(release-script): actually build the library (#559) https://github.com/algolia/algoliasearch-helper-js/commit/421ec706606798035dda2e2226fd3eb9015ec901

## 2.23.1 (2017-12-12)
 * chore(package.json): add files entry (#557) https://github.com/algolia/algoliasearch-helper-js/commit/de029bda667a9b43239cacb1d0b3c92826611d6e
 * chore(test): run all tests (#551) https://github.com/algolia/algoliasearch-helper-js/commit/851cf4826b03f63aafcb26eedca3ac101ced362b
 * fix(url): treat insideBoundingBox in float form  as number (#554) https://github.com/algolia/algoliasearch-helper-js/commit/3a7423eb444a798c50528e2296931074c8fad1d3, closes https://github.com/algolia/algoliasearch-helper-js/issues/553

## 2.23.0 (2017-10-18)
 * chore(doc): export the svg for the principles without text (#548) https://github.com/algolia/algoliasearch-helper-js/commit/1d8068048e16ee71af97a886f6324a84cc696137
 * chore(readme): Add jsDelivr hits badge (#547) https://github.com/algolia/algoliasearch-helper-js/commit/33850059a14952e0eb1910b70b857b8bbeba48ab
 * feat(sffv): can override search when using searchForFacetValues (#549) https://github.com/algolia/algoliasearch-helper-js/commit/55c2e753be2236df91cd33a11a113e9dc4dd3038
 * fix(events): only trigger change when there is an actual change (#546) https://github.com/algolia/algoliasearch-helper-js/commit/80f97242aaebaacbda0c5d750c62bf709fa0f502

## 2.22.0 (2017-10-09)
 * chore(release): changelog should be updated during release (#530) https://github.com/algolia/algoliasearch-helper-js/commit/ba26e95896ee38607afb58ab09775ef059e51f3c
 * chore(test): add test for the request builder and analytics (#545) https://github.com/algolia/algoliasearch-helper-js/commit/0377f495e84c166aa6a836c2738688f1e1b58d7e
 * chore(tool): Publishing the website requires a manual intervention https://github.com/algolia/algoliasearch-helper-js/commit/8497c3cb12cfc369496e9997a5e1de7ab317f674
 * chore(tool): replace 'gh-pages-deploy' with 'gh-pages' https://github.com/algolia/algoliasearch-helper-js/commit/ac1462bf28af4ea155f7458cce3918161c70ef8d
 * feat(query rules): expose userData (#544) https://github.com/algolia/algoliasearch-helper-js/commit/2f935204b5fd92098d17b8579863d6a761a573a3, closes https://github.com/algolia/algoliasearch-helper-js/issues/529
 * fix(FacetValue doc): wrong attribute name in docs (#539) https://github.com/algolia/algoliasearch-helper-js/commit/7275a756510f5d7df460ae99cb88af6c2e617424
 * fix(requestBuilder): set analytics:false to subsequent queries (#543) https://github.com/algolia/algoliasearch-helper-js/commit/ebf41d97ea088af674e3661bfdd7f432018fc2c1, closes https://github.com/algolia/algoliasearch-helper-js/issues/540
 * fix(setState): use .make() instead of constructor() (#542) https://github.com/algolia/algoliasearch-helper-js/commit/173da7cb256d007b7328b6c90aa037b17dcf95be

## 2.21.2 (2017-07-27)
 * chore(cdn): update jsdelivr URL https://github.com/algolia/algoliasearch-helper-js/commit/5f663802dcb92a62e3e434dec1b68917973af3b5
 * chore(doc): update header https://github.com/algolia/algoliasearch-helper-js/commit/a5399fb9614d124716369b9f7acd339719c4ab63
 * chore(release): new release script (#525) https://github.com/algolia/algoliasearch-helper-js/commit/ef0c7e24b58c4ced1ad8ec47335b2aff064094ef
 * chore(tool): Correctly detect branch in release.js https://github.com/algolia/algoliasearch-helper-js/commit/9dd8cc749eeb880faef8678e3dd66fda55545e9b
 * chore(tooling): conventional changelog integration (#523) https://github.com/algolia/algoliasearch-helper-js/commit/1c4d097389d5dc7dc34099fedb27f5f7fbb621de
 * fix(SearchResults): add exhaustiveNbHits and exhaustiveFacetsCount https://github.com/algolia/algoliasearch-helper-js/commit/fad31fbb2ba32f472ca28a8a88faff08a0900e80, closes https://github.com/algolia/algoliasearch-helper-js/issues/489
 * 2.21.2 - 2017-07-27 https://github.com/algolia/algoliasearch-helper-js/commit/baa6387cc361b86803e7b62ebce32eae348e1135

## 2.21.1 (2017-07-20)
 * fix(events): We need searchEmptyQueue before result to avoid inconsistency
 * chore(ci): fix build so that tests can be executed
 * fix(url): When there are no "other attributes" should not render last &
 * fix(pending-search): dispatch error event before searchQueueEmpty
 * chore(doc): typo in example

## 2.21.0 (2017-07-08)
 * fix(events): events for all kinds of searches
 * docs(jsdoc): fix misc spelling and typos

## 2.20.1 (2017-03-11)
 * fix(build): Remove es2015 module

## 2.20.0 (2017-03-10)
 * feat(pending-search): let the dev know the state of the search requests queue
 * feat(maxFacetHits): implement maxFacetHits for SFFV
 * chore(build): Provide an ES module build

## 2.19.0 (2017-03-06)
 *  feat(search-response): Exposed raw results
 *  doc(concepts): fix formulation
 *  doc(derivation): Fix typo (fix #476)

## 2.18.1 (2017-02-14)
 * fix(agent): sets the helper agent once
 * doc(concepts): Fix typo
 * fix(toggleRefinement): rename toggleRefinement to toggleFacetRefinement

## 2.18.0 (2017-01-10)
 * feat(client): Add methods to set/get the client.
 * doc(sffv): Add the type of the results of searchForFacetValues
 * test(constructor): Update and rename instanciate.js to instantiate.js

## 2.17.1 (2016-12-28)
 * fix(agent): Add a test if addAlgoliaAgent exists

## 2.17.0 (2016-12-22)
 * feat(derive): Let the user create a derivation of an helper
 * misc(user-agent): Add a user agent for the JS Helper
 * misc(ga): add trackers :see-no-evil:
 * fix(doc): fix deep object documentation

## 2.16.0 (2016-12-06)
 * feat(searchForFacetValues): new method to search in facet values

## 2.15.0 (2016-11-22)
 * feat(getQuery): return the main query that will be sent to Algolia using
 the helper
 * fix(searchOnce): Passing null for results to callback when err present. Fix #399
 * doc(reference): fixed addDisjunctiveFacetRefinement example
 * doc(content): Fix minor typos

## 2.14.0 (2016-09-09)
 * feat(hierarchicalFacets): add add and remove operations on hierarchical facets
 * fix(SearchParameters): Using unknown parameters not showing warning
 * doc(readme): Fix link to documentation
 * doc(getFacetValues): number of facets > maxValuesPerFacet
 * test(perf): add perf test
 * chore(package): update onchange to version 3.0.0
 * chore(package): update pretty-bytes to version 4.0.2

## 2.13.0 (2016-08-24)
 * fix(getFacetValues): fix the ordering when not specified
 * fix(hierarchicalFacets): do not throw if no refinements
 * fix(excludes): conjunctive facets results report exclusions
 * fix(setQueryParameters): falsey params returns the same instance
 * feat(Helper): add / remove facets methods
 * feat(Helper): add clearCache method
 * feat(SearchParameters): do not update page when using setters
 * feat(SearchResults): backport instantsearch.js getRefinement method

## 2.12.0 (2016-07-22)
  * feat(docs): new landing page + doc
  * chore(dependencies): upgrade dependencies, especially move to lodash 4

## 2.11.1 (2016-07-20)
  * chore(build): add build in npm for npmcdn.com usage

## 2.11.0 (2016-06-22)
  * feat(getStateAsQueryString): add safe option to encode the whole url instead of "smart" (but failing)
  encoding

## 2.10.0 (2016-06-10)
  * fix(_parseNumbers): let the user store values that are not parseable
  numbers for root parameters of the state (eg. aroundRadius='all')
  * fix(perf): remove deepFreeze
  * test(_parseNumbers): moar tests
  * doc(misc): fix typos

## 2.9.1 (2016-03-16)
  * fix(filterState): handle hierarchical facet attributes

## 2.9.0 (2016-02-19)
  * feat(SearchParameters): Support for unknown parameters
  * feat(url-tools): Support for remapping keys in URL methods
  * fix(filters): Makes it possible to add then remove a string based numeric
  filter
  * docs(pagination): documents the page number reset behavior

## 2.8.1 (2016-02-01)
  * feat: add snippetEllipsisText, disableExactOnAttributes, enableExactOnSingleWordQuery
  * docs(readme): fix wrong /doc links

## 2.8.0 (2015-12-11)
  * feat(search-parameters): adds support for optionnal tag and facet filters
  * fix(search-results): adds missing results parameters (fix #261)
  * fix(hierarchicalFacets): ensures the order of the hierarchical facets matches the order of the declared hierarchical attributes
  * test(CI): IE8 now requires a polyfill

## 2.7.0 (2015-12-02)
  * feature(algoliasearch.helper): adds getNumericRefinement (fix #214)
  * fix(request-builder): makes queries less ambiguous for client (fix #205)
  * fix(core): makes node dependencies explicit (fix #256)
  * chore(tests): reorganizes tests

## 2.6.9 (2015-11-24)
  * FIX : exclude hierarchical facet when the rootPath equal to the facet

## 2.6.8 (2015-11-24)
  * FEATURE: add prefix path option to hierarchical facet
  * FEATURE: add showParentLevel options to the hierararchical facet

## 2.6.7 (2015-11-17)
  * FIX : does not throw when no results when using hierarchical facets

## 2.6.6 (2015-11-04)
  * FIX : adds missing attribute minProximity in SearchParameters
  * FIX : adds numeric missing parameters in the parsing function
  * CHORE : updates jsdoc links (were outdated)
  * CHORE : adds missing documentation for filter on SearchParameters

## 2.6.5 (2015-11-03)
  * FIX: hierarchical toggle refine + new query with no result led to throw

## 2.6.4 (2015-11-02)
  * FIX: setPage 0 when toggling hierarchical refinements (consistency)

## 2.6.3 (2015-10-19)
  * FIX: add new geo search parameters

## 2.6.2 (2015-10-16)
  * CHORE : removes console.dir in code

## 2.6.1 (2015-10-15)
  * FEATURE : auto magic toggleRefinement on SearchParameters

## 2.6.0 (2015-10-15)
  * FEATURE : new function to get a query string from any state
  * FEATURE : filter on a state to get only part of the search parameters
  * FIX : Fix isNumericRefined and removeNumericFilters
  * CHORE : expose url related functions in a dedicated module
  algoliasearchHelper.urlTools

## 2.5.1 (2015-10-12)
  * FIX: the AlgoliaSearchHelper.getFacetsStats was not returning the stats
  if the attribute was both a regular & disjunctive facet.

## 2.5.0 (2015-10-09)
  * CHORE : Update qs to 5.2.0
  * FEATURE : getStateAsQueryString now orders the serialized parameters
  * FIX : IE8 has no array indexof


## 2.4.0 (2015-09-23)
  * FEATURE : add AlgoliaSearchHelper.getState(filters) to get a filtered state
  * FEATURE : add AlgoliaSearchHelper.getStateAsQueryString to get a part of
  the state as a queryString
  * FEATURE : add AlgoliaSearchHelper.setStateFromQueryString to set the state
  of the helper with a query string
  * FEATURE : add AlgoliaSearchHelper.getConfigurationFromQueryString. Reads
  a query string and returns the associated partial helper configuration
  * FEATURE : add AlgoliaSearchHelper.getForeignConfigurationInQueryString to
  get the configuration contained in a qs that is not from the helper
  * FIX : all the properties that are supposed to be numbers are now parsed in
  the SearchParameters

## 2.3.6 (2015-09-17)
  * CHORE: technical release, move all deps to ^version and add a shrinkwrap to allow reproducible builds

## 2.3.5 (2015-09-12)
  * FIX: getFacetStats should look into facets and disjunctiveFacets

## 2.3.4 (2015-09-11)
  * FIX: #208, getFacetValues should return an empty array if the facet is
  defined but there are no returned values for it (and not throw an exception)
  * CHORE : drop tests on iojs
  * CHORE : travis now requires us to install if missing node env

## 2.3.3 (2015-09-09)
  * FIX: hasRefinements fix, should check facet, disjunctive, hierarchical, numeric

## 2.3.2 (2015-09-03)
  * FIX: allow passing the `length` parameter, fix `searchParameters` iteration

## 2.3.1 (2015-09-02)
  * CHORE: add a console.error() when passing unknown parameters
  * FIX: add offset/length undocumented search parameters

## 2.3.0 (2015-09-02)
  * FEATURE: #136, fire a 'search' event once a search is sent to Algolia
  * FEATURE: ability to set multiple OR and AND filters with the numeric
  filter API
  * FEATURE: Ability to set the raw numeric filter string
  * CHORE: #125, events documentation
  * FIX(CANBREAK): semantic of addNumericRefinement indeed add an numeric, does not
  update anymore. This can possibly BREAK your code if you were relying on this. Email support@algolia.com if it does
  * FEATURE: add `requestsent` event on the helper when any request is sent
  * FEATURE: add results.getFacetStats
  * FEATURE: add `results.getFacetValues` and add sortBy option to it

## 2.2.0 (2015-07-29)
  * FIX: #130 toggleRefine should throw an exception when executed with an
  attribute that is not a declared facet
  * TEST: add CI testing (browsers, phantom, node, io)
  * FEATURE: add hierarchicalFacets
  * FIX: fix IE8 and IE9 compatibility
  * REFACTOR: get rid of custom `extend` method, use lodash tools
  * FIX: do not force distinct value to false on empty query
  * DOCS: provide a better readme with tips on how to use the helper
  * FIX: is$Method always return true/false instead of true/undefined
  * FIX: throw when refining an unknown facet
  * FEATURE: implement helper.getState()

## 2.1.2 (2015-06-26)
  * FIX: #113 support for attributes hightlightPreTag and hightlighPostTag
  * FIX: #112 distinct = undefined sent to the server
  * FIX: #110 helper.hasRefinements() now checks for numerics
  * FIX: #106 convert refinements to string
  * DOC: Update theme + fix (github.com/algolia/minami)
  * DOC: Fix misc links and descrition and added samples of objects
  * DOC: Added a cheat sheet in the generated documentation

## 2.1.1 (2015-06-19)
  * FIX: #107 Apply rules to distinct to prevent the API to return an error
  * FIX: make algoliasearch-helper requireable + browserifyable by removing the global envify transform

## 2.1.0 (2015-06-15)
  * FIX: #29 Avoid callback for outdated queries
  * FIX: #64 Sum up the processing time of all queries
  * FIX: #92 Parameters that can be set in the dashboard shouldn't have
  defaults
  * FIX: #62 Make sure disctinct is set to false when it's not possible to
  use distinct in Algolia
  * FEATURE: #91 Support for tags (with support for the raw format #98)
  * FEATURE: #70 Ability to get all refined values: helper.getRefinements(
  facetname )
  * FEATURE: #51 multiple filters for a single conjunctive facet (tests)
  * FEATURE: Ability to modify any parameter of the state easily (#76 #84 #12)
  * FEATURE: #69 Ability to know if a facet is refined, whatever the value
  * FEATURE: #86 Expose SearchParameters, AlgoliaSearchHelper, SearchResults to
  users directly in the builds
  * FEATURE: #25 let the user do a clearRefinement with a function as a filter
  * REFACTORING: SearchParameters is immutable (#14)
  * REFACTORING: Ensure SearchParameters is totally frozen (#14)
  * LIB: Update lodash version to 3.9.x

2.0.4
  * FIX: #82 Fix facet count on records with multiple values for a single
  facet
  * FEATURE: Add exhaustive attribute to a facet and removed useless timeout
  (#80)

## 2.0.3 (2015-05-13)
  * FIX: #72 add back the ability to do multiple disjunctive facetting on a
  single attribute
  * FEATURE: #73 method to replace the state, without triggering a change
  event: overrideStateWithoutTriggeringChangeEvent (use wisely)
  * FEATURE: #66 add setTypoTolerance to SearchParameters

## 2.0.2 (2015-05-06)
  * FIX: setHitsPerPage was creating a new property HitsPerPage instead of
  updating the currently available hitsPerPage

2.0.1
  * MEH: because of jsDelivr

2.0.0
  * FIX: set page to 0 if it might change the number of pages returned
  * FIX: handle distinct parameter automatically
  * FIX: batch response handler gets the proper search state
  * FEATURE: (breaking) Now peer depend on algoliasearch v3.1
  * FEATURE: (breaking) Facets stats and timeout infos are consistently
  grouped in the facet object in the SearchResults
  * FEATURE: (breaking) no more extra queries
  * FEATURE: (breaking) Facets results are stored in an array with an order
  that reflects their definition.
  * FEATURE: Search results explicit definition
  * FEATURE: (breaking) Search parameters as a separate object
  * FEATURE: (breaking) Move callback style to a event based API
  * FEATURE: change and results events return the state and the results (if any)
  * FEATURE: SearchRefults.getFacetByName to retrieve a facet object from its
  name
  * FEATURE: SearchParameters.getNumericRefinement: get back the value of a specific numeric
  refinement
  * FEATURE: clear refinements by name
  * FEATURE: isDisjunctiveRefined to check if a disjunctive facet is refined
  * FEATURE: basic support for numeric filters
  * FEATURE: version number on the main helper factory
  * TESTS: defaults test

1.1.0
  * REFACTORING: constructor, now expose the defaults
  * TESTS: defaults test
  * FEATURE: Allow .search(q, params, cb) "callback always last" convention
    introduced by JavaScript client, also on the helper

1.0.0
  * Extraction of the helper from the algolia-client-js v2.9.4
  * FEATURE: CommonJS compatibility
  * FEATURE: UMD builds in dist/
  * TESTS: Some basic tests