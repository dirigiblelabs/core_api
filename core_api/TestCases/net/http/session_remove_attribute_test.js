/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

session.removeAttribute("attr1")
session.removeAttribute("attr2");
session.removeAttribute("repository-instance")
var names = session.getAttributeNames();

response.println("[Attribute Names]: " + JSON.stringify(names));
response.flush();
response.close();
