var config       = require('../config');
var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks');

var developmentTask = function(cb) {
	global.development = true;
	var tasks = getEnabledTasks('development');
	gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch-dev', cb);
}

gulp.task('development', developmentTask);
module.exports = developmentTask;