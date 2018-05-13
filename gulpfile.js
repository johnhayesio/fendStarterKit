// DEPENDENCIES
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const images = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// PATHS
const styleSrc = 'source/sass/**/*.sass';
const styleDest = 'build/assets/css/';
const htmlSrc = 'source/';
const htmlDest = 'build/';
const vendorSrc = 'source/js/vendors/';
const vendorDest = 'build/assets/js/';
const scriptSrc = 'source/js/*.js';
const scriptDest = 'build/assets/js/';


// Stand Alone Tasks

// Compiles all SASS files
gulp.task('sass', () => {
  return gulp.src('source/sass/**/*.sass')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min',
    }))

    .pipe(gulp.dest('build/assets/css'));
});

gulp.task('images', () => {
  return gulp.src('source/img/*')
    .pipe(images())
    .pipe(gulp.dest('build/assets/img'));
});

// Uglify js files
gulp.task('scripts', () => {
  return gulp.src('source/js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('build/assets/js'));
});

// Move BS4 js to build/assets/js
gulp.task('bsjs', () => {
  return gulp.src(
    [
      'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    .pipe(gulp.dest('source/js/vendors'));
});

// Move BS4 css to build/assets/fonts
gulp.task('bscss', () => {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('build/assets/css'));
});

// Concat and Compress Vendor .js files
gulp.task('vendors', () => {
  return gulp.src('source/js/vendors/*.js')
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

// Move Animate.css to build/assets/css
gulp.task('animate', () => {
  return gulp.src('node_modules/animate.css/animate.min.css')
    .pipe(gulp.dest('build/assets/css'));
});

// Watch for changes
gulp.task('watch', () => {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './build'
    },
    open: false,
    notify: false,
  });

  gulp.watch(styleSrc, ['sass']);
  gulp.watch(scriptSrc, ['scripts']);
  gulp.watch(vendorSrc, ['vendors']);
  gulp.watch(['build/*.html', 'build/assets/css/*.css', 'build/assets/js/*.js', 'build/assets/js/vendors/*.js']).on('change', browserSync.reload);
});

// Use default task to launch Browsersync and watch JS files
gulp.task('default', ['sass', 'scripts', 'vendors', 'watch'], () => {});
