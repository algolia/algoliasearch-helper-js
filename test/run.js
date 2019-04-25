'use strict';

var path = require('path');
var jest = require('jest');
var algolia = require('algoliasearch');
var staticJestConfig = require('../jest.config');

var enableIntegrationTest =
  process.env.ONLY_UNIT !== 'true' &&
  process.env.INTEGRATION_TEST_API_KEY &&
  process.env.INTEGRATION_TEST_APPID;

var projectsRootPaths = [path.resolve(__dirname, '..')];
var dynamicJestConfig = Object.assign({}, staticJestConfig, {
  maxWorkers: 4,
  setupFilesAfterEnv: staticJestConfig.setupFilesAfterEnv || []
});

if (enableIntegrationTest) {
  dynamicJestConfig.testMatch.push('<rootDir>/test/integration-spec/**/*.[jt]s?(x)');
  dynamicJestConfig.setupFilesAfterEnv.push(path.resolve(__dirname, '..', 'jest.setup.js'));
}

jest.runCLI(dynamicJestConfig, projectsRootPaths).then(function(response) {
  if (!response.results.success) {
    process.exitCode = response.globalConfig.testFailureExitCode;
  }

  if (enableIntegrationTest) {
    var client = algolia(process.env.INTEGRATION_TEST_APPID, process.env.INTEGRATION_TEST_API_KEY);

    client.listIndexes().then(content => {
      content.items
        .map(i => i.name)
        .filter(n => n.indexOf('_travis-algoliasearch-helper') !== -1)
        .forEach(n => client.deleteIndex(n));
    });
  }
});
