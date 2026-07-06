// create class attribute from string arguments
module.exports = function() {

	var value = '';

	for(var i = 0; i < arguments.length; i++) {
		if(typeof arguments[i] === 'string') {
			value += arguments[i] + ' ';
		}
	}

	if(value.length > 0) {
		value = ' class="' + value.replace(/\s$/, '') + '"';
	}

	return value;

};
