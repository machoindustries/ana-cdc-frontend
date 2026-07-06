var config = require('../../../gulpfile.js/config');
var path = require('path');
var slash = require('slash');

module.exports = function (type) { 
  var config_root_base = (global.production) ? config.root.base.prod : config.root.base.dev;
  var base_path = config_root_base;

  switch (type) {
    case 'js':
      base_path = slash(path.join(config_root_base, config.tasks.js.dest, '/'));
      break;
    case 'css':
      base_path = slash(path.join(config_root_base, config.tasks.css.dest, '/'));
      break;
    case 'images':
      base_path = slash(path.join(config_root_base, config.tasks.images.dest, '/'));
      break; 
    case 'static':
      base_path = slash(path.join(config_root_base, config.tasks.static.dest, '/'));
      break;  
  }

  return base_path;
};
