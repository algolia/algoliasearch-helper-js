'use strict';

var SearchResults = require('../../../src/SearchResults');
var SearchParameters = require('../../../src/SearchParameters');

describe('disjunctive facet', function() {
  test.each([
    [
      'nothing pinned',
      {
        values: {
          brand: {
            order: []
          }
        }
      },
      [
        {count: 551, isRefined: false, name: 'Insignia™'},
        {count: 511, isRefined: false, name: 'Samsung'},
        {count: 386, isRefined: true, name: 'Apple'}
      ]
    ],
    [
      'all pinned',
      {
        values: {
          brand: {
            order: ['Samsung', 'Apple', 'Insignia™']
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung'},
        {count: 386, isRefined: true, name: 'Apple'},
        {count: 551, isRefined: false, name: 'Insignia™'}
      ]
    ],
    [
      'one item pinned (implicit sort)',
      {
        values: {
          brand: {
            order: ['Samsung']
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung'},
        {count: 551, isRefined: false, name: 'Insignia™'},
        {count: 386, isRefined: true, name: 'Apple'}
      ]
    ],
    [
      'one item pinned (sort by count)',
      {
        values: {
          brand: {
            order: ['Samsung'],
            sortRemainingBy: 'count'
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung'},
        {count: 551, isRefined: false, name: 'Insignia™'},
        {count: 386, isRefined: true, name: 'Apple'}
      ]
    ],
    [
      'one item pinned (sort by alpha)',
      {
        values: {
          brand: {
            order: ['Samsung'],
            sortRemainingBy: 'alpha'
          }
        }
      },
      [
        {count: 511, isRefined: false, name: 'Samsung'},
        {count: 386, isRefined: true, name: 'Apple'},
        {count: 551, isRefined: false, name: 'Insignia™'}
      ]
    ],
    [
      'one item pinned (sort by hidden)',
      {
        values: {
          brand: {
            order: ['Samsung'],
            sortRemainingBy: 'hidden'
          }
        }
      },
      [{count: 511, isRefined: false, name: 'Samsung'}]
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
      {count: 511, isRefined: false, name: 'Samsung'},
      {count: 551, isRefined: false, name: 'Insignia™'},
      {count: 386, isRefined: true, name: 'Apple'}
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
      {count: 511, isRefined: false, name: 'Samsung'},
      {count: 386, isRefined: true, name: 'Apple'},
      {count: 551, isRefined: false, name: 'Insignia™'}
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
      {count: 386, isRefined: true, name: 'Apple'},
      {count: 551, isRefined: false, name: 'Insignia™'},
      {count: 511, isRefined: false, name: 'Samsung'}
    ];

    expect(facetValues).toEqual(expected);
  });
});

describe('hierarchical facet', function() {
  test('empty facet ordering', function() {
    var data = require('./getRefinements/hierarchical-cards.json');
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
        },
        {
          name: 'Cameras & Camcorders',
          path: 'Cameras & Camcorders',
          count: 753,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'TV & Home Theater',
          path: 'TV & Home Theater',
          count: 617,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Car Electronics & GPS',
          path: 'Car Electronics & GPS',
          count: 509,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Health, Fitness & Beauty',
          path: 'Health, Fitness & Beauty',
          count: 385,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office & School Supplies',
          path: 'Office & School Supplies',
          count: 302,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Video Games',
          path: 'Video Games',
          count: 178,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Housewares',
          path: 'Housewares',
          count: 135,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Electronics',
          path: 'Office Electronics',
          count: 122,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Toys, Games & Drones',
          path: 'Toys, Games & Drones',
          count: 104,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Connected Home',
          path: 'Connected Home',
          count: 96,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Telephones & Communication',
          path: 'Telephones & Communication',
          count: 76,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Wearable Technology',
          path: 'Wearable Technology',
          count: 68,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Name Brands',
          path: 'Name Brands',
          count: 55,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Paper',
          path: 'Paper',
          count: 48,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Musical Instruments',
          path: 'Musical Instruments',
          count: 40,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Household Essentials',
          path: 'Household Essentials',
          count: 32,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Scanners, Faxes & Copiers',
          path: 'Scanners, Faxes & Copiers',
          count: 25,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Furniture & Storage',
          path: 'Office Furniture & Storage',
          count: 14,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Movies & Music',
          path: 'Movies & Music',
          count: 13,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Magnolia Home Theater',
          path: 'Magnolia Home Theater',
          count: 10,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Furniture & Decor',
          path: 'Furniture & Decor',
          count: 6,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Batteries & Power',
          path: 'Batteries & Power',
          count: 5,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Carfi Instore Only',
          path: 'Carfi Instore Only',
          count: 4,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Home',
          path: 'Home',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Microwaves',
          path: 'Microwaves',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root pinned (no sortRemainingBy)', function() {
    var data = require('./getRefinements/hierarchical-cards.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Audio', 'Scanners, Faxes & Copiers']
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
          name: 'Scanners, Faxes & Copiers',
          path: 'Scanners, Faxes & Copiers',
          count: 25,
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
        },
        {
          name: 'Cameras & Camcorders',
          path: 'Cameras & Camcorders',
          count: 753,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'TV & Home Theater',
          path: 'TV & Home Theater',
          count: 617,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Car Electronics & GPS',
          path: 'Car Electronics & GPS',
          count: 509,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Health, Fitness & Beauty',
          path: 'Health, Fitness & Beauty',
          count: 385,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office & School Supplies',
          path: 'Office & School Supplies',
          count: 302,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Video Games',
          path: 'Video Games',
          count: 178,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Housewares',
          path: 'Housewares',
          count: 135,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Electronics',
          path: 'Office Electronics',
          count: 122,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Toys, Games & Drones',
          path: 'Toys, Games & Drones',
          count: 104,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Connected Home',
          path: 'Connected Home',
          count: 96,
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
            }
          ]
        },
        {
          name: 'Telephones & Communication',
          path: 'Telephones & Communication',
          count: 76,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Wearable Technology',
          path: 'Wearable Technology',
          count: 68,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Name Brands',
          path: 'Name Brands',
          count: 55,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Paper',
          path: 'Paper',
          count: 48,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Musical Instruments',
          path: 'Musical Instruments',
          count: 40,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Household Essentials',
          path: 'Household Essentials',
          count: 32,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Furniture & Storage',
          path: 'Office Furniture & Storage',
          count: 14,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Movies & Music',
          path: 'Movies & Music',
          count: 13,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Magnolia Home Theater',
          path: 'Magnolia Home Theater',
          count: 10,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Furniture & Decor',
          path: 'Furniture & Decor',
          count: 6,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Batteries & Power',
          path: 'Batteries & Power',
          count: 5,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Carfi Instore Only',
          path: 'Carfi Instore Only',
          count: 4,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Home',
          path: 'Home',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Microwaves',
          path: 'Microwaves',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root pinned (sortRemainingBy count)', function() {
    var data = require('./getRefinements/hierarchical-cards.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Audio', 'Scanners, Faxes & Copiers'],
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
          name: 'Audio',
          path: 'Audio',
          count: 1010,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Scanners, Faxes & Copiers',
          path: 'Scanners, Faxes & Copiers',
          count: 25,
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
        },
        {
          name: 'Cameras & Camcorders',
          path: 'Cameras & Camcorders',
          count: 753,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'TV & Home Theater',
          path: 'TV & Home Theater',
          count: 617,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Car Electronics & GPS',
          path: 'Car Electronics & GPS',
          count: 509,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Health, Fitness & Beauty',
          path: 'Health, Fitness & Beauty',
          count: 385,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office & School Supplies',
          path: 'Office & School Supplies',
          count: 302,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Video Games',
          path: 'Video Games',
          count: 178,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Housewares',
          path: 'Housewares',
          count: 135,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Electronics',
          path: 'Office Electronics',
          count: 122,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Toys, Games & Drones',
          path: 'Toys, Games & Drones',
          count: 104,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Connected Home',
          path: 'Connected Home',
          count: 96,
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
            }
          ]
        },
        {
          name: 'Telephones & Communication',
          path: 'Telephones & Communication',
          count: 76,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Wearable Technology',
          path: 'Wearable Technology',
          count: 68,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Name Brands',
          path: 'Name Brands',
          count: 55,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Paper',
          path: 'Paper',
          count: 48,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Musical Instruments',
          path: 'Musical Instruments',
          count: 40,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Household Essentials',
          path: 'Household Essentials',
          count: 32,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Furniture & Storage',
          path: 'Office Furniture & Storage',
          count: 14,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Movies & Music',
          path: 'Movies & Music',
          count: 13,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Magnolia Home Theater',
          path: 'Magnolia Home Theater',
          count: 10,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Furniture & Decor',
          path: 'Furniture & Decor',
          count: 6,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Batteries & Power',
          path: 'Batteries & Power',
          count: 5,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Carfi Instore Only',
          path: 'Carfi Instore Only',
          count: 4,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Home',
          path: 'Home',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Microwaves',
          path: 'Microwaves',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root pinned (sortRemainingBy alpha)', function() {
    var data = require('./getRefinements/hierarchical-cards.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Audio', 'Scanners, Faxes & Copiers'],
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
        // pinned
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
          name: 'Scanners, Faxes & Copiers',
          path: 'Scanners, Faxes & Copiers',
          count: 25,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        // ordered alphabetically
        {
          name: 'Batteries & Power',
          path: 'Batteries & Power',
          count: 5,
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
            }
          ]
        },
        {
          name: 'Cameras & Camcorders',
          path: 'Cameras & Camcorders',
          count: 753,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Car Electronics & GPS',
          path: 'Car Electronics & GPS',
          count: 509,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Carfi Instore Only',
          path: 'Carfi Instore Only',
          count: 4,
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
        },
        {
          name: 'Connected Home',
          path: 'Connected Home',
          count: 96,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Furniture & Decor',
          path: 'Furniture & Decor',
          count: 6,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Health, Fitness & Beauty',
          path: 'Health, Fitness & Beauty',
          count: 385,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Home',
          path: 'Home',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Household Essentials',
          path: 'Household Essentials',
          count: 32,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Housewares',
          path: 'Housewares',
          count: 135,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Magnolia Home Theater',
          path: 'Magnolia Home Theater',
          count: 10,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Microwaves',
          path: 'Microwaves',
          count: 1,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Movies & Music',
          path: 'Movies & Music',
          count: 13,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Musical Instruments',
          path: 'Musical Instruments',
          count: 40,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Name Brands',
          path: 'Name Brands',
          count: 55,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office & School Supplies',
          path: 'Office & School Supplies',
          count: 302,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Electronics',
          path: 'Office Electronics',
          count: 122,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Office Furniture & Storage',
          path: 'Office Furniture & Storage',
          count: 14,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Paper',
          path: 'Paper',
          count: 48,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'TV & Home Theater',
          path: 'TV & Home Theater',
          count: 617,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Telephones & Communication',
          path: 'Telephones & Communication',
          count: 76,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Toys, Games & Drones',
          path: 'Toys, Games & Drones',
          count: 104,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Video Games',
          path: 'Video Games',
          count: 178,
          isRefined: false,
          exhaustive: true,
          data: null
        },
        {
          name: 'Wearable Technology',
          path: 'Wearable Technology',
          count: 68,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('root pinned (sortRemainingBy hidden)', function() {
    var data = require('./getRefinements/hierarchical-cards.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Appliances', 'Audio', 'Scanners, Faxes & Copiers'],
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
          name: 'Scanners, Faxes & Copiers',
          path: 'Scanners, Faxes & Copiers',
          count: 25,
          isRefined: false,
          exhaustive: true,
          data: null
        }
      ]
    };

    expect(facetValues).toEqual(expected);
  });

  test('two levels pinned (sortRemainingBy count)', function() {
    var data = require('./getRefinements/hierarchical-cards.json');
    var order = {
      renderingContent: {
        facetOrdering: {
          values: {
            'hierarchicalCategories.lvl0': {
              order: ['Best Buy Gift Cards'],
              sortRemainingBy: 'hidden'
            },
            'hierarchicalCategories.lvl1': {
              order: ['Swag Gift Cards'],
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
              name: 'Swag Gift Cards',
              path: 'Best Buy Gift Cards > Swag Gift Cards',
              count: 20,
              isRefined: false,
              exhaustive: true,
              data: null
            },
            {
              name: 'Entertainment Gift Cards',
              path: 'Best Buy Gift Cards > Entertainment Gift Cards',
              count: 17,
              isRefined: true,
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
