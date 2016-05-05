/* globals $ javax */
/* eslint-env node, dirigible */

exports.get = function(key) {
	return $.get(key);
};

exports.set = function(key, value) {
	$.set(key, value);
};
