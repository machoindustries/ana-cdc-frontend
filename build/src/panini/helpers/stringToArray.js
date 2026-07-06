// convert comma delimited string to an array
module.exports = function(val) {
	return val.split(/,[\s+]?/);
};
