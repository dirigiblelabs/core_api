/* globals $ */
/* eslint-env node, dirigible */

exports.sendMail = function(from, to, subject, content) {
	$.getMailService().sendMail(from, to, subject, content);
};
