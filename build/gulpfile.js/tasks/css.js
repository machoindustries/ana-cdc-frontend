/**
 * This task handles all CSS pre and post processing
 */

var config = require('../config');

if (!config.tasks.css) return;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('autoprefixer')
var path = require('path');
var url = require('url');
var cssnano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var postcss_url = require('postcss-url');
var slash = require('slash');

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssTask = function () {
  var config_root_base = (global.production) ? config.root.base.prod : config.root.base.dev;

  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init({largeFile: true})))
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(postcss([
      postcss_url({
        url: function (url) {
          return slash(path.join(config_root_base,config.tasks.images.dest,url.originUrl));
        }
      }),
      autoprefixer(config.tasks.css.autoprefixer)
    ]))
    .pipe(gulpif(global.production, cssnano({ autoprefixer: false })))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('css', cssTask);
module.exports = cssTask;
