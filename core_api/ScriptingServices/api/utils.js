/* globals $ */
/* eslint-env node, dirigible */

exports.getIOUtils = function() {
	return $.getIOUtils();
};

exports.getHttpUtils = function() {
	return $.getHttpUtils();
};

exports.getBase64Utils = function() {
	return $.getBase64Utils();
};

exports.getHexUtils = function() {
	return $.getHexUtils();
};

exports.getDigestUtils = function() {
	return $.getDigestUtils();
};

exports.getUrlUtils = function() {
	return $.getUrlUtils();
};

exports.getUploadUtils = function() {
	return $.getUploadUtils();
};

exports.getUuidUtils = function() {
	return $.getUuidUtils();
};

exports.getDatabaseUtils = function() {
	return $.getDatabaseUtils();
};

exports.getXssUtils = function() {
	return $.getXssUtils();
};

exports.getXmlUtils = function() {
	return $.getXmlUtils();
};

exports.get = function(key) {
	return $.get(key);
};

exports.set = function(key, value) {
	return $.set(key, value);
};
