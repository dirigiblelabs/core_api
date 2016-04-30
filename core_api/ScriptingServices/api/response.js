/* globals $ */
/* eslint-env node, dirigible */

exports.print = function(input) {
	return $.getResponse().getWriter().print(input);
};

exports.println = function(input) {
	return $.getResponse().getWriter().println(input);
};

exports.flush = function(input) {
	return $.getResponse().getWriter().flush();
};

exports.close = function(input) {
	return $.getResponse().getWriter().close();
};