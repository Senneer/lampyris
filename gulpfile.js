'use strict';

var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  connect = require('gulp-connect'),
  csscomb = require('gulp-csscomb'),
  sass = require('gulp-sass'),
  flexbugs = require('postcss-flexbugs-fixes'),
  babel = require('gulp-babel'),
  rigger = require('gulp-rigger');

//connect
gulp.task('connect', function() {
  connect.server({
    root: './subcontracts/',
    livereload: true,
    port: 8888
  });
});

//js
gulp.task('js', function() {
  return gulp.src('./js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./subcontracts/js/'))
    .pipe(connect.reload());
});

//css
gulp.task('css', function() {
  var processors = [autoprefixer({browsers: ['last 3 version', 'ie >= 10']}), flexbugs];
  return gulp.src('./scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(csscomb())
  .pipe(gulp.dest('./subcontracts/css/'))
  .pipe(connect.reload());
});

//html
gulp.task('html', function(){
  return gulp.src('./html/*.html')
  .pipe(rigger())
  .pipe(gulp.dest('./subcontracts/'))
  .pipe(connect.reload());
});

//watch
gulp.task('watch', function(){
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./html/**.html', ['html']);
});

//default
gulp.task('default', ['connect', 'js', 'html', 'css', 'watch']);