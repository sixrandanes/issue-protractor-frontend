/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system-polyfills.js.map',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'moment/moment.js',
      'angular2-moment/**/*.+(js|js.map)',
      '@vaadin/**/*.+(js|js.map)',
      '@ngrx/**/*.+(js|js.map)',
      'ckeditor/**/*.*',
      'core-js/**/*.*',
      'es6-shim/**/*.*'
    ]
  });
};
