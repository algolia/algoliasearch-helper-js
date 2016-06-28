'use strict';
module.exports = {
  watch: true,
  module: {
    loaders: [{
      test: /\.js$/, exclude: /node_modules/, loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  output: {
    filename: '[name].js'
  }
};
