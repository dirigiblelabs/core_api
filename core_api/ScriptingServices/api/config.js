/* globals $ java */
/* eslint-env node, dirigible */

exports.get = function(path, key) {
	try {
		var value = $.getConfigurationStorage().getProperty(path, key);
	} catch(e) {
		return null;
	}
	return new java.lang.String(value === null ? "" : value);
}

exports.set = function(path, key, value) {
	$.getConfigurationStorage().putProperty(path, key, value);
}

exports.delete = function(path) {
	$.getConfigurationStorage().delete(path);
}

exports.clear = function() {
	$.getConfigurationStorage().clear();
}

exports.getJson = function(path) {
	try {
		var value = $.getConfigurationStorage().getJson(path);
	} catch(e) {
		return null;
	}
	return new java.lang.String(value === null ? "" : value);
}

exports.setJson = function(path, json) {
	$.getConfigurationStorage().putJson(path, json);
}