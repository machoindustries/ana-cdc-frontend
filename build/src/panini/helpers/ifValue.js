// test a value
module.exports = function(value, compare, options) {
	if (value == compare) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
};
