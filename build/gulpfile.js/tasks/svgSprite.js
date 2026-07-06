var config = require('../config');
if (!config.tasks.svgSprite) return;

var browserSync = require('browser-sync');
var gulp = require('gulp');
//var imagemin = require('gulp-imagemin');
var image = require('gulp-image');
var svgstore = require('gulp-svgstore');
var path = require('path');

var svgSpriteTask = function () {

  var settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
  }

  return gulp.src(settings.src)
    //.pipe(imagemin())
    .pipe(image({
      pngquant: false,
      optipng: false,
      zopflipng: false,
      jpegRecompress: false,
      jpegoptim: false,
      mozjpeg: false,
      gifsicle: false,
      svgo: true,
      concurrent: 10
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());
}

gulp.task('svgSprite', svgSpriteTask);
module.exports = svgSpriteTask;