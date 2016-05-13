/* globals $ java */
/* eslint-env node, dirigible */

exports.get = function(path) {
	return new java.lang.String($.getConfigurationStorage().get(path));
}

exports.set = function(path, data) {
	$.getConfigurationStorage().put(path, new java.lang.String(data).getBytes());
}

exports.delete = function(path) {
	$.getConfigurationStorage().delete(path);
}

exports.clear = function() {
	$.getConfigurationStorage().clear();
}
