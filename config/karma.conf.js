module.exports = function (config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul')
    ],
    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    files: [
      { pattern: 'dist/elements.html', included: true, watched: false },
      { pattern: 'dist/app/bower_components/ckeditor/ckeditor.js', included: true, watched: false },

      { pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false },
      { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },
      { pattern: 'dist/vendor/core-js/client/shim.js', included: true, watched: false },

      { pattern: 'dist/vendor/reflect-metadata/Reflect.js', included: true, watched: false },

      { pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/long-stack-trace-zone.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/proxy.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/sync-test.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/fake-async-test.js', included: true, watched: false },
      { pattern: 'dist/vendor/zone.js/dist/jasmine-patch.js', included: true, watched: false },

        
      { pattern: 'config/karma-test-shim.js', included: true, watched: true },

      // Distribution folder.
      { pattern: 'dist/**/*', included: false, watched: true }
    ],
    exclude: [
      // Vendor packages might include spec files. We don't want to use those.
      'dist/vendor/**/*.spec.js'
    ],

    preprocessors: {
      'dist/app/shared/**/!(*spec).js': ['coverage'],
      'dist/app/business/**/!(*spec).js': ['coverage'],
      'dist/app/!(*spec).js': ['coverage']
    },

    coverageReporter: {
      includeAllSources: true,
      reporters:[
        {type: 'json', subdir: '.', file: 'coverage-final.json'},
        {type: 'cobertura', subdir: '.'},
        {type: 'lcov', subdir: '.'}
      ]
    },

    remapIstanbulReporter: {
      src: 'coverage/coverage-final.json',
      reports: {
        html: 'coverage'
      },
      timeoutNotCreated: 1000,
      timeoutNoMoreFiles: 1000
    },

    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: true,

    browserNoActivityTimeout : 100000
  });
};