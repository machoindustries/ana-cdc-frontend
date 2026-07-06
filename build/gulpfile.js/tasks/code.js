/**
 * Watches for code changes in the defined folders and reloads BrowserSync
 * 
 * This task is not enabled by default
 * 
 * Need to add this block in your config.json file under "tasks" to activate
 * Src - Path to use to look for file changes, leave empty for site root 
 * Extensions - Array of file types to watch based on file extension.  Example here is PHP files
 * 
 * "code": {
 *    "src": "",
 *    "extensions": [
 *      "php"
 *    ]
 *  }
 */

var config = require('../config');
if (!config.tasks.code) return;

var gulp = require('gulp');
var browserSync = require('browser-sync');
var path = require('path');

var codeTask = function () { 
  // Just reload browserSync if code is changed
  browserSync.reload();  
}

gulp.task('code', codeTask);
module.exports = codeTask;