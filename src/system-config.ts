/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'moment': 'vendor/moment/moment.js',
  'angular2-moment': 'vendor/angular2-moment',
  '@vaadin': 'vendor/@vaadin',
  '@ngrx': 'vendor/@ngrx',
  'rxjs': 'vendor/rxjs',
  '@angular': 'vendor/@angular'
};

/** User packages configuration. */
const packages: any = {
  'angular2-moment': { defaultExtension: 'js' },
  '@vaadin/angular2-polymer': { main: 'index.js', defaultExtension: 'js' },
  '@angular/core': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/core.umd.js'
  },
  '@angular/common': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/common.umd.js'
  },
  '@angular/compiler': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/compiler.umd.js'
  },
  '@angular/platform-browser': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/platform-browser.umd.js'
  },
  '@angular/platform-browser-dynamic': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/platform-browser-dynamic.umd.js'
  },
  '@angular/http': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/http.umd.js'
  },
  '@angular/router': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/router.umd.js'
  },
  '@angular/forms': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'bundles/forms.umd.js'
  },
  'rxjs': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/store': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/core': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/store-devtools': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/store-log-monitor': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/store-log-monitor/dock-monitor': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/store-log-monitor/log-monitor': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/store-log-monitor/json-tree': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@ngrx/effects': {  format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  'bower_components': { defaultExtension: 'js' }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // App specific barrels.
  'app',
  //shared
  'app/shared',
  'app/shared/constantes',
  'app/shared/components',
  'app/shared/components/grid',
  'app/shared/components/grid/store',
  'app/shared/directives',
  'app/shared/pipes',
  'app/shared/model',
  'app/shared/forms',
  'app/shared/modules',
  'app/shared/modules/grid',
  'app/shared/modules/grid/store',
  'app/shared/modules/toast',
  'app/shared/modules/toast/store',
  'app/shared/modules/flip',
  'app/shared/modules/flip/store',
  'app/shared/services',
  'app/shared/store/actions',
  'app/shared/store/effects',
  'app/shared/store/reducers',
  'app/shared/utils',

  //pays
  'app/business/referentiel/pays',
  'app/business/referentiel/pays/pages',
  'app/business/referentiel/pays/components',
  'app/business/referentiel/pays/store',
  'app/business/referentiel/pays/service'
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
