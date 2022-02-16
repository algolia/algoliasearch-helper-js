'use strict';

var SearchResults = require('../../../src/SearchResults');
var SearchParameters = require('../../../src/SearchParameters');

describe('disjunctive facet', function() {
  test.each([
    [
      'nothing ordered (implicit sort by count)',
      {
        values: {
          brand: {
            order: []
          }
        }
      },
      [
        {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
        {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
        {count: 386, isRefined: true, name: 'Apple', value: 'Apple'}
      ]
    ],
    [
      'all ordered',
      {
        values: {
          brand: {
            order: ['Samsung', 'Apple', 'Insignia™']
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
        {count: 386, isRefined: true, name: 'Apple', value: 'Apple'},
        {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'}
      ]
    ],
    [
      'one item ordered (implicit sort by count)',
      {
        values: {
          brand: {
            order: ['Samsung']
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
        {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
        {count: 386, isRefined: true, name: 'Apple', value: 'Apple'}
      ]
    ],
    [
      'one item ordered (sort by count)',
      {
        values: {
          brand: {
            order: ['Samsung'],
            sortRemainingBy: 'count'
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
        {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
        {count: 386, isRefined: true, name: 'Apple', value: 'Apple'}
      ]
    ],
    [
      'one item ordered (sort by alpha)',
      {
        values: {
          brand: {
            order: ['Samsung'],
            sortRemainingBy: 'alpha'
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
        {count: 386, isRefined: true, name: 'Apple', value: 'Apple'},
        {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'}
      ]
    ],
    [
      'one item ordered (sort by hidden)',
      {
        values: {
          brand: {
            order: ['Samsung'],
            sortRemainingBy: 'hidden'
          }
        }
      },
      [{count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'}]
    ]
  ])('%p', function(_name, facetOrdering, expected) {
    var data = require('./getFacetValues/disjunctive.json');
    var order = {
      renderingContent: {
        facetOrdering: facetOrdering
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('brand');

    expect(facetValues).toEqual(expected);
  });

  test('sortBy overrides facetOrdering', function() {
    var data = require('./getFacetValues/disjunctive.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            brand: {
              order: ['Samsung', 'Apple', 'Insignia™']
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('brand', {sortBy: ['name:desc']});

    var expected = [
      {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
      {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
      {count: 386, isRefined: true, name: 'Apple', value: 'Apple'}
    ];

    expect(facetValues).toEqual(expected);
  });

  test('facetOrdering: true overrides sortBy', function() {
    var data = require('./getFacetValues/disjunctive.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            brand: {
              order: ['Samsung', 'Apple', 'Insignia™']
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('brand', {
      sortBy: ['name:desc'],
      facetOrdering: true
    });

    var expected = [
      {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'},
      {count: 386, isRefined: true, name: 'Apple', value: 'Apple'},
      {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'}
    ];

    expect(facetValues).toEqual(expected);
  });

  test('facetOrdering: false without sortBy uses default order', function() {
    var data = require('./getFacetValues/disjunctive.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            brand: {
              order: ['Samsung', 'Apple', 'Insignia™']
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('brand', {
      facetOrdering: false
    });

    var expected = [
      {count: 386, isRefined: true, name: 'Apple', value: 'Apple'},
      {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
      {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'}
    ];

    expect(facetValues).toEqual(expected);
  });

  test('without facetOrdering, nor sortBy', function() {
    var data = require('./getFacetValues/disjunctive.json');
    var order = {
      renderingContent: {}
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('brand');

    var expected = [
      {count: 386, isRefined: true, name: 'Apple', value: 'Apple'},
      {count: 551, isRefined: false, name: 'Insignia™', value: 'Insignia™'},
      {count: 511, isRefined: false, name: 'Samsung', value: 'Samsung'}
    ];

    expect(facetValues).toEqual(expected);
  });
});

describe('hierarchical facet', function() {
  test('empty facet ordering', function() {
    var data = require('./getFacetValues/hierarchical.json');
    var order = {
      renderingContent: {
        facetOrdering: {}
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('hierarchicalCategories');

    var expected = {
      name: 'hierarchicalCategories',
      count: null,
      isRefined: true,
      path: null,
      exhaustive: true,
      data: [
        {
          name: 'Best Buy Gift Cards',
          path: 'Best Buy Gift Cards',
          count: 80,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              count: 17,
              data: null,
              exhaustive: true,
              isRefined: true,
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards'
            },
            {
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Useless Gift Cards',
              path: 'Best Buy Gift Cards > Useless Gift Cards',
              count: 12,
              isRefined: false,
              exhaustive: true,
              data: null
            }
          ]
        },
        {
          name: 'Cell Phones',
          path: 'Cell Phones',
          count: 1920,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Computers & Tablets',
          path: 'Computers & Tablets',
          count: 1858,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Appliances',
          path: 'Appliances',
          count: 1533,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Audio',
          path: 'Audio',
          count: 1010,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root ordered (no sortRemainingBy)', function() {
    var data = require('./getFacetValues/hierarchical.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Best Buy Gift Cards', 'Audio']
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('hierarchicalCategories');

    var expected = {
      name: 'hierarchicalCategories',
      count: null,
      isRefined: true,
      path: null,
      exhaustive: true,
      data: [
        {
          name: 'Appliances',
          path: 'Appliances',
          count: 1533,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Best Buy Gift Cards',
          path: 'Best Buy Gift Cards',
          count: 80,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              count: 17,
              data: null,
              exhaustive: true,
              isRefined: true,
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards'
            },
            {
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Useless Gift Cards',
              path: 'Best Buy Gift Cards > Useless Gift Cards',
              count: 12,
              isRefined: false,
              exhaustive: true,
              data: null
            }
          ]
        },
        {
          name: 'Audio',
          path: 'Audio',
          count: 1010,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          count: 1920,
          data: null,
          exhaustive: true,
          isRefined: false,
          name: 'Cell Phones',
          path: 'Cell Phones'
        },
        {
          count: 1858,
          data: null,
          exhaustive: true,
          isRefined: false,
          name: 'Computers & Tablets',
          path: 'Computers & Tablets'
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root ordered (sortRemainingBy count)', function() {
    var data = require('./getFacetValues/hierarchical.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Best Buy Gift Cards'],
              sortRemainingBy: 'count'
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('hierarchicalCategories');

    var expected = {
      name: 'hierarchicalCategories',
      count: null,
      isRefined: true,
      path: null,
      exhaustive: true,
      data: [
        {
          name: 'Appliances',
          path: 'Appliances',
          count: 1533,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Best Buy Gift Cards',
          path: 'Best Buy Gift Cards',
          count: 80,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards',
              count: 17,
              isRefined: true,
              exhaustive: true,
              data: null
            },
            {
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Useless Gift Cards',
              path: 'Best Buy Gift Cards > Useless Gift Cards',
              count: 12,
              isRefined: false,
              exhaustive: true,
              data: null
            }
          ]
        },
        {
          name: 'Cell Phones',
          path: 'Cell Phones',
          count: 1920,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Computers & Tablets',
          path: 'Computers & Tablets',
          count: 1858,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Audio',
          path: 'Audio',
          count: 1010,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root ordered (sortRemainingBy alpha)', function() {
    var data = require('./getFacetValues/hierarchical.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Best Buy Gift Cards'],
              sortRemainingBy: 'alpha'
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('hierarchicalCategories');

    var expected = {
      name: 'hierarchicalCategories',
      count: null,
      isRefined: true,
      path: null,
      exhaustive: true,
      data: [
        {
          name: 'Appliances',
          path: 'Appliances',
          count: 1533,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Best Buy Gift Cards',
          path: 'Best Buy Gift Cards',
          count: 80,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards',
              count: 17,
              isRefined: true,
              exhaustive: true,
              data: null
            },
            {
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Useless Gift Cards',
              path: 'Best Buy Gift Cards > Useless Gift Cards',
              count: 12,
              isRefined: false,
              exhaustive: true,
              data: null
            }
          ]
        },
        {
          name: 'Audio',
          path: 'Audio',
          count: 1010,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Cell Phones',
          path: 'Cell Phones',
          count: 1920,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Computers & Tablets',
          path: 'Computers & Tablets',
          count: 1858,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root ordered (sortRemainingBy hidden)', function() {
    var data = require('./getFacetValues/hierarchical.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Audio', 'Best Buy Gift Cards'],
              sortRemainingBy: 'hidden'
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('hierarchicalCategories');

    var expected = {
      name: 'hierarchicalCategories',
      count: null,
      isRefined: true,
      path: null,
      exhaustive: true,
      data: [
        {
          name: 'Appliances',
          path: 'Appliances',
          count: 1533,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Audio',
          path: 'Audio',
          count: 1010,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Best Buy Gift Cards',
          path: 'Best Buy Gift Cards',
          count: 80,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards',
              count: 17,
              isRefined: true,
              exhaustive: true,
              data: null
            },
            {
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Useless Gift Cards',
              path: 'Best Buy Gift Cards > Useless Gift Cards',
              count: 12,
              isRefined: false,
              exhaustive: true,
              data: null
            }
          ]
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('two levels ordered (sortRemainingBy count)', function() {
    var data = require('./getFacetValues/hierarchical.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Best Buy Gift Cards'],
              sortRemainingBy: 'hidden'
            },
            'hierarchicalCategories.lvl1': {
              order: ['Best Buy Gift Cards > Entertainment Gift Cards'],
              sortRemainingBy: 'count'
            }
          }
        }
      }
    };
    var results = data.content.results.slice();
    results[0] = Object.assign(order, results[0]);

    var searchParams = new SearchParameters(data.state);
    var result = new SearchResults(searchParams, results);

    var facetValues = result.getFacetValues('hierarchicalCategories');

    var expected = {
      name: 'hierarchicalCategories',
      count: null,
      isRefined: true,
      path: null,
      exhaustive: true,
      data: [
        {
          name: 'Best Buy Gift Cards',
          path: 'Best Buy Gift Cards',
          count: 80,
          isRefined: true,
          exhaustive: true,
          data: [
            {
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards',
              count: 17,
              isRefined: true,
              exhaustive: true,
              data: null
            },
            {
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Useless Gift Cards',
              path: 'Best Buy Gift Cards > Useless Gift Cards',
              count: 12,
              isRefined: false,
              exhaustive: true,
              data: null
            }
          ]
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });
});

test('does not return empty items', function() {
  var rawResults = require('./getFacetValues/sparse.json');
  var results = new SearchResults(new SearchParameters({
    disjunctiveFacets: ['brands']
  }), rawResults.results);

  expect(results.getFacetValues('brands', {facetOrdering: true})).toEqual([
    {name: 'Addo', value: 'Addo', count: 321, isRefined: false},
    {name: 'Paw Patrol', value: 'Paw Patrol', count: 130, isRefined: false},
    {name: 'Mattel', value: 'Mattel', count: 586, isRefined: false},
    {name: 'Nick Jr.', value: 'Nick Jr.', count: 147, isRefined: false},
    {name: 'Early Learning Centre', value: 'Early Learning Centre', count: 292, isRefined: false},
    {name: 'Hot Wheels', value: 'Hot Wheels', count: 94, isRefined: false},
    {name: 'Fisher-Price', value: 'Fisher-Price', count: 104, isRefined: false},
    {name: 'Funko', value: 'Funko', count: 187, isRefined: false},
    {name: 'Nickelodeon', value: 'Nickelodeon', count: 230, isRefined: false}
  ]);
});
