// DEPENDENCIES
const autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  uglifyes = require('uglify-es'),
  composer = require('gulp-uglify/composer'),
  uglify = composer(uglifyes, console),
  images = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();

// PATHS
const styleSrc = 'source/sass/**/*.sass',
  styleDest = 'build/assets/css/',
  htmlSrc = 'source/',
  htmlDest = 'build/',
  vendorSrc = 'source/js/vendors/',
  vendorDest = 'build/assets/js/',
  scriptSrc = 'source/js/*.js',
  scriptDest = 'build/assets/js/';


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
