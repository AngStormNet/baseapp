// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  chromeDriver: '/srv/app/node_modules/webdriver-manager/selenium/chromedriver_2.26',
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      binary: '/usr/bin/google-chrome',
      'args': ['--window-size=1920,1080', '--test-type', '--no-sandbox'],
      extensions: [],
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      savePath: 'test-reports/',
      consolidateAll: true
    });
    jasmine.getEnv().addReporter(junitReporter);
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  },
};
