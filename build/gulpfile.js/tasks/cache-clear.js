/**
 *  Clears all gulp-caches.  Can be manually run using `npm run gulp cache-clear`
 */ 
var gulp = require('gulp');
var cache = require('gulp-cache');

var cacheClearTask = function () {
  return cache.clearAll();
}

gulp.task('cache-clear', cacheClearTask);
module.exports = cacheClearTask;