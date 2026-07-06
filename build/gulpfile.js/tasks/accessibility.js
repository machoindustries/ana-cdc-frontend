var config = require('../config');
if (!config.tasks.accessibility) return;

var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');
var access = require('gulp-accessibility');

var paths = {
  // src: path.join(config.root.src, config.tasks.accessibility.src, '/**/*.html'),
  src: path.join(config.root.dest, '/**/*.html'),
  dest: path.join(config.root.dest, config.tasks.accessibility.dest),
  ignore: '!' + path.join(config.root.dest, '/assets/**/*'),
}

var accessibilityTask = function () {

  return gulp.src([paths.src, paths.ignore])
    .pipe(access({
      force: true
    }))
    .on('error', console.log)
    .pipe(access.report({ reportType: 'txt' }))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest(paths.dest));
}

gulp.task('accessibility', accessibilityTask)
module.exports = accessibilityTask
