/**
 * Task to handle moving of Font Awesome fonts
 * 
 * This task is not enabled by default
 * 
 * Need to have font-awesome NPM module installed
 * Need to add this block in your config.json file under "tasks" to activate
 * 
 * "fontAwesome": {
 *   "src": "./node_modules/font-awesome/fonts",
 *    "dest": "assets/fonts"
 *  }
 */

var config = require('../config');
if (!config.tasks.fontAwesome) return;

var gulp = require('gulp');
var changed = require('gulp-changed');
var path = require('path');

var paths = {
  src: path.join(config.tasks.fontAwesome.src,'*.*'),
  dest: path.join(config.root.dest, config.tasks.fontAwesome.dest)
}

var fontawesomeTask = function () {
  return gulp.src([paths.src])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));    
}

gulp.task('fontAwesome', fontawesomeTask);
module.exports = fontawesomeTask;