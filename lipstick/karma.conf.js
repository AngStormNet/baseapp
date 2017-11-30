// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs2-launcher'),
      require('karma-coverage'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('@angular/cli/plugins/karma'),
    ],
    frameworks: ['jasmine', '@angular/cli'],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
        './src/test.ts': ['@angular/cli'],
        'src/**/*.js': ['coverage'],
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: ['progress', 'dots', 'coverage', 'junit'],

    coverageReporter: {
        dir: 'test-reports',
        includeAllSources: true,
        reporters: [
            {
                type: 'text-summary'
            },{
                type: 'clover',
                dir: 'test-reports',
                subdir: '.',
                file: 'clover.xml',
                includeAllSources: true,
            }
        ]
    },

    junitReporter: {
        outputDir: 'test-reports',
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['PhantomJS2'],
    singleRun: true
  });
};
