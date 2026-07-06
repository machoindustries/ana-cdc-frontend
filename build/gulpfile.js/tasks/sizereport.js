var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var sizereport = require('gulp-sizereport');

gulp.task('size-report', function () {
  return gulp.src([
    config.root.dest + '/**/*',
    '!' + path.join(config.root.dest, 'rev-manifest.json'),
    '!' + path.join(config.root.dest, '/assets/js/docs/**/*'),
  ])
    .pipe(sizereport({
      gzip: true
    }));
});
