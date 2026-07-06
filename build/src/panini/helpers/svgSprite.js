module.exports = function(icon_name, title) {
  //var icon_name = options.fn(this);
  return '<span class="svg-sprite -'+icon_name+'"><svg role="img" aria-label="'+title+'"><use xlink:href="#'+icon_name+'"></use></svg></span>';
};