/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

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
