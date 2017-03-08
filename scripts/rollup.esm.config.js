const commonjs = require('rollup-plugin-commonjs');

export default {
  entry: 'dist/algoliasearch.helper.js',
  plugins: [
    commonjs()
  ],
  targets: [
    { dest: 'dist/algoliasearch.helper.esm.js', format: 'es' }
  ]
};
