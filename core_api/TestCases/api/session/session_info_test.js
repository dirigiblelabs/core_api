/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var session = require('api/session');

var info = {
	"id": session.getId(),
	"creationTime": new Date(session.getCreationTime()),
	"lastAccessedTime": session.getLastAccessedTime(),
	"maxInactiveInterval": session.getMaxInactiveInterval()
};

session.setMaxInactiveInterval(5000);
info.newMaxInactiveInterval = session.getMaxInactiveInterval();

response.println("[Info]: " + JSON.stringify(info));
response.flush();
response.close();
