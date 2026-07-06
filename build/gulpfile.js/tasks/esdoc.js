var config = require('../config');

if (!config.tasks.esdoc) return;

var gulp = require('gulp');
var path = require('path');
var esdoc = require('gulp-esdoc');
var merge = require('lodash/merge');


var paths = {
  src: path.join(config.root.src, config.tasks.esdoc.src),
  dest: path.join(config.root.dest, config.tasks.esdoc.dest)
}

var options = merge({ "destination": paths.dest }, config.tasks.esdoc.options);

var esdocTask = function () {
  return gulp.src(paths.src)
    .pipe(esdoc(options));
}

gulp.task('esdoc', esdocTask);
module.exports = esdocTask;