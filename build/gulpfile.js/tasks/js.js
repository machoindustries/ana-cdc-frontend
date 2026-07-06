var config = require('../config');
if (!config.tasks.js) return;

var config  = require('../lib/webpack-multi-config')('development');
var gulp    = require('gulp');
var logger  = require('../lib/compileLogger');
var webpack = require('webpack');

var js = function(cb) {  
  return webpack(config, function(err, stats) {
    logger(err, stats);
    if (typeof cb === 'function') {
      cb();
    }
  });
}

gulp.task('js', js);
module.exports = js;