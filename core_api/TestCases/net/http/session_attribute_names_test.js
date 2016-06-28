/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

session.setAttribute("attr2", "Value2");
var names = session.getAttributeNames();

response.println("[Attribute Names]: " + JSON.stringify(names));
response.flush();
response.close();
