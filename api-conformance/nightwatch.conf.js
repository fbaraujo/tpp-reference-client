require('babel-register');
const config = require('../config');

require('nightwatch-cucumber')({
  cucumberArgs: ['--format', 'node_modules/cucumber-pretty', 'api-conformance/features'],
});

module.exports = (function(settings) {
  settings.test_workers = false;

  settings.selenium.server_path = require('selenium-server').path; // eslint-disable-line
  settings.selenium.cli_args['webdriver.chrome.driver'] = require('chromedriver').path; // eslint-disable-line

  settings.test_settings.default.globals.devServerURL = `http://localhost:${process.env.PORT || config.dev.port}`;

  return settings;
})(require('./nightwatch.json'));
