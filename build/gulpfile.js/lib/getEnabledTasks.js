var config = require('../config');
var compact = require('lodash/compact');

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'fontAwesome', 'images', 'favicon', 'svgSprite'];
// var codeTasks = ['html', 'css', 'js', 'accessibility', 'esdoc'];
var codeTasks = ['html', 'css', 'js', 'esdoc'];

module.exports = function (env) {
  //console.log(env);
  function matchFilter(task) {
    if (config.tasks[task]) {
      if (task === 'js') {
        if (env === 'production') {
          task = 'webpack:production';
        } else if (env !== 'development') {
          task = false;
        }
        //task = env === 'production' ? 'webpack:production' : false;
      }

      return task;
    }
  }

  function exists(value) {
    return !!value;
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists))
  }
}
