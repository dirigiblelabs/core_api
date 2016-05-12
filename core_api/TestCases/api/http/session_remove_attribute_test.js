/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var session = require('api/http/session');

session.removeAttribute("attr1")
session.removeAttribute("attr2");
session.removeAttribute("repository-instance")
var names = session.getAttributeNames();

response.println("[Attribute Names]: " + names);
response.flush();
response.close();
