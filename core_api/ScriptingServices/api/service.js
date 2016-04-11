/* globals $ */
/* eslint-env node, dirigible */

exports.getRequest = function() {
	return $.getRequest();
};

exports.getResponse = function() {
	return $.getResponse();
};

exports.getSession = function() {
	return $.getSession();
};

exports.getUserName = function() {
	return $.getUserName();
};

exports.getContext = function() {
	return $.getExecutionContext();
};
