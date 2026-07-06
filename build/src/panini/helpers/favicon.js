var fs = require('fs');
var config = require('../../../gulpfile.js/config');
var path = require('path');
var chalk	= require('chalk');

module.exports = function(favicon) { 
  var settings = {    
    dest: path.join(config.root.dest,config.tasks.favicon.dest, favicon)
  }

  // Return the Favicon HTML if it exists overwise note that it's missing
  if (fs.existsSync(settings.dest)) {
    return fs.readFileSync(settings.dest, 'utf8'); 
  } else {
    console.log(chalk.yellow(path.join(config.tasks.favicon.dest, favicon))+' appears to be missing, injecting an empty string instead');
    return '';
  }  
};