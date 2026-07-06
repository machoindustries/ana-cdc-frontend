var config = require('../config');
if (!config.tasks.images) return;

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var gulp = require('gulp');
//var imagemin = require('gulp-imagemin');
var image = require('gulp-image');
var path = require('path');
var cache = require('gulp-cache');

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.images.dest)
}

var imagesTask = function () {
  return gulp.src([paths.src, , '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    //.pipe(imagemin()) // Optimize
    .pipe(cache(image({
      pngquant: true,
      optipng: true,
      zopflipng: false,
      jpegRecompress: true,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    })))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('images', imagesTask);
module.exports = imagesTask;