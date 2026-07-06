// test for Object type
module.exports = function(item, options) {
	if(typeof item === "object") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
