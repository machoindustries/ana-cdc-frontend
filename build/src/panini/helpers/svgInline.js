var fs = require('fs');
var config = require('../../../gulpfile.js/config');
var path = require('path');
var chalk = require('chalk');

module.exports = function(spritesheet) { 
  var settings = {    
    dest: path.join(config.root.dest,config.tasks.svgSprite.dest, spritesheet)
  }
 
  // Return the SVG Spritesheet if it exists overwise note that it's missing
  if (fs.existsSync(settings.dest)) {
    return '<div class="svg-sprite-sheet visuallyhidden" aria-hidden="true">'+fs.readFileSync(settings.dest, 'utf8')+'</div>';
  } else {
    console.log(chalk.yellow(path.join(config.tasks.svgSprite.dest, spritesheet))+' appears to be missing, injecting an empty string instead');
    return '';
  }
};