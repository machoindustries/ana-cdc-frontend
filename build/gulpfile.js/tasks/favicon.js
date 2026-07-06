var config = require('../config');
if (!config.tasks.favicon) return;

var gulp = require('gulp');
var favicons = require('gulp-favicons');
var handleErrors = require('../lib/handleErrors');
var path = require('path');

var paths = {
  src: path.join(config.root.src, config.tasks.favicon.src),
  dest: path.join(config.root.dest, config.tasks.favicon.dest),
}

var faviconTask = function () {
  var config_root_base = (global.production) ? config.root.base.prod : config.root.base.dev;
 
  return gulp.src(paths.src)
    .pipe(favicons({
      appName: config.tasks.favicon.siteName,
      appDescription: config.tasks.favicon.siteDescription,
      url: config.tasks.favicon.siteUrl,
      version: config.tasks.favicon.version,
      background: config.tasks.favicon.background,  
      path: config_root_base + config.tasks.favicon.dest,   
      online: false,
      html: 'favicon.html',
      pipeHTML: true,
      replace: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        firefox: true,
        windows: true,
        yandex: false
      }
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest));
}

gulp.task('favicon', faviconTask);
module.exports = faviconTask;