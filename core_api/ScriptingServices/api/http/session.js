/* globals $ javax */
/* eslint-env node, dirigible */

exports.getAttribute = function(name) {
	return $.getSession().getAttribute(name);
};

exports.setAttribute = function(name, value) {
	$.getSession().setAttribute(name, value);
};

exports.removeAttribute = function(name) {
	$.getSession().removeAttribute(name);
};

exports.getAttributeNames = function() {
	var names = [];
	var values = $.getSession().getAttributeNames();
	while (values.hasMoreElements()) {
		names.push(values.nextElement());
	}
	return names;
};

exports.getId = function() {
	return $.getSession().getId();
};

exports.getCreationTime = function() {
	return $.getSession().getCreationTime();
};

exports.getLastAccessedTime = function() {
	return $.getSession().getLastAccessedTime();
};

exports.getMaxInactiveInterval = function() {
	return $.getSession().getMaxInactiveInterval();
};

exports.setMaxInactiveInterval = function(interval) {
	$.getSession().setMaxInactiveInterval(interval);
};

exports.invalidate = function() {
	$.getSession().invalidate();
};
