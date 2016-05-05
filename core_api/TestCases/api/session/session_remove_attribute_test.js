/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var session = require('api/session');

session.removeAttribute("attr1")
session.removeAttribute("attr2");
session.removeAttribute("repository-instance")
var names = session.getAttributeNames();

response.println("[Attribute Names]: " + names);
response.flush();
response.close();
