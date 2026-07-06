// join arrays into string
module.exports = function(val, delimiter, start, end) {
	return [].concat(val).slice(start, end).join(delimiter);
};
