var config = require('../config');
if (!config.tasks.html) return;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var handleErrors = require('../lib/handleErrors');
var path = require('path');
var render = require('panini');
var htmlmin = require('gulp-htmlmin');

var paths = {
  src: path.join(config.root.src, config.tasks.html.src, config.tasks.html.pages, '/**/*.{' + config.tasks.html.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.html.dest)
}

var htmlTask = function () {

  render.refresh();
  return gulp.src(paths.src)
    .pipe(render({
      root: path.join(config.root.src, config.tasks.html.src, config.tasks.html.pages),
      layouts: path.join(config.root.src, config.tasks.html.src, config.tasks.html.layouts),
      partials: path.join(config.root.src, config.tasks.html.src, config.tasks.html.partials),
      helpers: path.join(config.root.src, config.tasks.html.src, config.tasks.html.helpers),
      data: path.join(config.root.src, config.tasks.html.src, config.tasks.html.data),
    }))
    .on('error', handleErrors)
		/*.pipe(htmlmin({
      collapseWhitespace: true 
      //,conservativeCollapse: true
    }))*/
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload);
    //.pipe(browserSync.stream());
}

gulp.task('html', htmlTask)
module.exports = htmlTask
