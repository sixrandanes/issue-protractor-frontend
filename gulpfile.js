(function () {
  'use strict';

  const gulp = require('gulp');
  const webserver = require('gulp-webserver');
  const shell = require('gulp-shell');
  const copy = require('gulp-copy');
  const clean = require('gulp-clean');
  const filter = require('gulp-filter');
  const rename = require("gulp-rename");
  const htmlmin = require('gulp-htmlmin');
  const cleanCSS = require('gulp-clean-css');
  const inject = require('gulp-inject-string');
  const replace = require('gulp-replace');
  const sass = require('gulp-sass');

  /**
   * Commande de lancement du built angular-cli, en mode prod
   * @type {string}
   */
  const cmdAngCli = 'ng build -prod';

  /**
   * Commande de lancement de vulcanize (optims imports polymer)
   * @type {string}
   */
  const cmdVulcanize = 'vulcanize -o ./dist-tmp/elements.vulcanized.html ./dist-tmp/elements.html --strip-comments --inline-scripts --inline-css';

  /**
   * Suppression du repertoire dist
   * @returns {*}
   */
  const cleanDist = () => {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
  };

  /**
   * Suppression du repertoire coverage
   * @returns {*}
   */
  const cleanCoverage = () => {
    return gulp.src('./coverage', {read: false})
        .pipe(clean());
  };

  /**
   * Generation du dist avec angular-cli, en mode production
   * @returns {*}
   */
  const generationDistAngularCli = () => {

    return gulp.src('./src', {read: false})
        .pipe(shell([
          cmdAngCli
        ]))
  };

  /**
   * Copy du dist ds un dist-tmp
   * @returns {*}
   */
  const copyDist =  () => {
    return gulp.src(['dist/**']).pipe(gulp.dest('dist-tmp'));
  };

  /**
   * clean repertoire Bower dependencies ds dist-tmp
   * @returns {*}
   */
  const cleanBower =  () => {
    return gulp.src('./dist-tmp/app/bower_components', {read: false})
        .pipe(clean());
  };

  /**
   *  clean repertoire assets ds dist-tmp
   * @returns {*}
   */
  const cleanAssets = () => {
    return gulp.src('./dist-tmp/app/assets', {read: false})
        .pipe(clean());
  };

  /**
   * Copy assets ds dist-tmp
   * @returns {*}
   */
  const distCopyAssets = () => {

    return gulp.src(['src/app/assets/**'])
        .pipe(gulp.dest('dist-tmp/app/assets/'));
  };

  /**
   * Copy Js files from bower_components ds dist-tmp
   * @returns {*}
   */
  const distCopyJs = () => {
    const jsFilter = filter('**/*.js');

    return gulp.src(['src/app/bower_components/**'])
        .pipe(jsFilter)
        .pipe(gulp.dest('dist-tmp/app/bower_components/'));
  };

  /**
   * Copy Html files from bower components ds dist-tmp
   * @returns {*}
   */
  const distCopyHtml = () => {
    const htmlFilter = filter(['**/*.html']);
    return gulp.src(['src/app/bower_components/**'])
        .pipe(htmlFilter)
        .pipe(gulp.dest('dist-tmp/app/bower_components/'));
  };

  /**
   * Clean les repertoires demo situes dans bower_components (dist-tmp)
   * @returns {*}
   */
  const cleanBowerDemo = () => {
    return gulp.src('./dist-tmp/app/bower_components/**/demo/', {read: false})
        .pipe(clean());
  };

  /**
   * clean les repertoire de tests situe dans bower_components (dist-tmp)
   * @returns {*}
   */
  const cleanBowerTest = () => {
    return gulp.src('./dist-tmp/app/bower_components/**/test', {read: false})
        .pipe(clean());
  };

  /**
   * Optimisation des import polymer avec vulcanize
   * @returns {*}
   */
  const vulcanize = () => {
    return gulp.src('./src', {read: false})
        .pipe(shell([
          cmdVulcanize
        ]));
  };

  /**
   * Rename fichier elements.vulcanized.html en elements.html
   */
  const renameVulcanize = () => {
    gulp.src("./dist-tmp/elements.vulcanized.html")
        .pipe(rename("elements.html"))
        .pipe(gulp.dest("./dist-tmp/"));
  };

  /**
   *  Suppression du fichier vulcanize.elements
   * @returns {*}
   */
  const delVulcanizeElements =  () => {
    return gulp.src('./dist-tmp/elements.vulcanized.html', {read: false})
        .pipe(clean());
  };

  /**
   * Suppression du repertoire dist
   * @returns {*}
   */
  const delDist = () => {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
  };

  /**
   * Copy du dist-tmp ds dist
   * @returns {*}
   */
  const distTmpCopy = () =>{
    return gulp.src(['./dist-tmp/**'])
        .pipe(gulp.dest('./dist'));
  };

  /**
   * Suppression du repertoire dist-tmp
   * @returns {*}
   */
  const cleanDistTmp = ()=> {
    return gulp.src('./dist-tmp', {read: false})
        .pipe(clean());
  };

  /**
   * Generation de la date du build
   * @returns {*}
   */
  const generationDateBuild = ()=> {
    return gulp.src('config/environment.prod.ts')
        .pipe(replace(/\[(.*?)\]/ , ''))
        .pipe(inject.after('#DATE#', '['+new Date()+']'))
        .pipe(gulp.dest('config'));
  };


  /**
   * Suppression import es6-shim
   * @returns {*}
   */
  const replaceEs6ShimImport = ()=> {
    return gulp.src('dist/index.html')
        .pipe(replace('<script src="vendor/es6-shim/es6-shim.js"></script>' , ''))
        .pipe(gulp.dest('dist'));
  };

  /**
   * Configuration du server
   */
  const server = ()=> {
    gulp.src('dist')
        .pipe(webserver({
          livereload: true,
          directoryListing: false,
          open: true,
          https:false,
          port:5000
        }));
  };

  /**
   * Minification des fichiers Html ds business
   */
  const minifyHtmlBusiness = () => {
    return gulp.src(['./dist-tmp/app/business/**/*.html'])
    //  .pipe(htmlmin())
        .pipe(gulp.dest('./dist-tmp/app/business'))
  };

  /**
   * Minification des fichiers Html ds shared
   */
  const minifyHtmlShared = () =>  {
    return gulp.src(['./dist-tmp/app/shared/**/*.html'])
    // .pipe(htmlmin())
        .pipe(gulp.dest('./dist-tmp/app/shared'))
  };

  /**
   * Minification des fichiers css ds Business
   */
  const minifyCssBusiness = () => {
    return gulp.src(['./dist-tmp/app/business/**/*.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist-tmp/app/business'))
  };

  /**
   * Minification des fichiers css ds shared
   */
  const minifyCssShared = () => {
    return gulp.src(['./dist-tmp/app/shared/**/*.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist-tmp/app/shared'))
  };
  /**
   * le fichier ilda.scss => ilda.css
   */
  const css = () =>  {
    return gulp.src('./dist-tmp/app/assets/stylesheets/ilda.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./dist-tmp/app/assets/stylesheets'));
  };

  gulp.task('clean-dist', cleanDist);

  gulp.task('clean-coverage', ['clean-dist'], cleanCoverage);

  gulp.task('generation-date-build', ['clean-coverage'], generationDateBuild);

  gulp.task('dist-ang-cli', ['generation-date-build'], generationDistAngularCli);

  gulp.task('dist-copy', ['dist-ang-cli'], copyDist);

  /*Les 2 etapes permettent de s'affranchir du process angular-cli dans le dossier assets (probleme avec le vulcanize)*/
  gulp.task('clean-assets', ['dist-copy'], cleanAssets );

  gulp.task('dist-copy-assets', ['clean-assets'], distCopyAssets);

  gulp.task('dist-copy-js', ['dist-copy-assets'], distCopyJs);

  gulp.task('dist-copy-html', ['dist-copy-js'], distCopyHtml);

  gulp.task('clean-bower-demo', ['dist-copy-html'], cleanBowerDemo);

  gulp.task('clean-bower-test', ['clean-bower-demo'], cleanBowerTest);

  gulp.task('minify-html-business', ['clean-bower-test'], minifyHtmlBusiness);

  gulp.task('minify-html-shared', ['minify-html-business'], minifyHtmlShared);

  gulp.task('minify-css-business', ['minify-html-shared'], minifyCssBusiness);

  gulp.task('minify-css-shared', ['minify-css-business'], minifyCssShared);

  gulp.task('vulcanize', ['minify-css-shared'], vulcanize);

  gulp.task('rename-vulcanize', ['vulcanize'], renameVulcanize);

  gulp.task('del-vulcanized-elements', ['rename-vulcanize'], delVulcanizeElements);

  gulp.task('del-dist', ['del-vulcanized-elements'], delDist);

  gulp.task('generation-css', ['del-dist'], css);

  gulp.task('dist-tmp-copy', ['generation-css'], distTmpCopy);

  gulp.task('del-dist-tmp', ['dist-tmp-copy'], cleanDistTmp);

  gulp.task('replace-es6-shim-import', ['del-dist-tmp'], replaceEs6ShimImport);

  gulp.task('dist', ['replace-es6-shim-import']);

  gulp.task('webserver', ['dist'], server);

})();
