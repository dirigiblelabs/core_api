/* globals $ */
/* eslint-env node, dirigible */

exports.getWiki = function() {
	return $.get("wiki");
};
