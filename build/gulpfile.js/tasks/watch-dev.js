var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var watch = require('gulp-watch');

var watchDevTask = function () {
  var watchableTasks = ['fonts', 'images', 'svgSprite', 'html', 'css', 'js', 'code'];

  watchableTasks.forEach(function (taskName) {
    var task = config.tasks[taskName];
    if (task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');

      watch(glob, function () { 
        console.log('Running Task: '+taskName);       
        require('./' + taskName)();
      })
    }
  });
}

gulp.task('watch-dev', watchDevTask);
module.exports = watchDevTask;