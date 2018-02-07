require('babel-register');
const config = require('../config');

require('nightwatch-cucumber')({
  cucumberArgs: ['--format', 'node_modules/cucumber-pretty', 'api-conformance/features'],
});

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['api-conformance/features'],
  output_folder: 'api-conformance/reports',
  custom_assertions_path: ['api-conformance/custom-assertions'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path, // eslint-disable-line
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path, // eslint-disable-line
    },
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: `http://localhost:${process.env.PORT || config.dev.port}`,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
