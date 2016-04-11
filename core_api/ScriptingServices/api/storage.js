/* globals $ */
/* eslint-env node, dirigible */

exports.getBinaryStorage = function() {
	return $.getBinaryStorage();
};

exports.getFileStorage = function() {
	return $.getFileStorage();
};

exports.getConfigurationStorage = function() {
	return $.getConfigurationStorage();
};
