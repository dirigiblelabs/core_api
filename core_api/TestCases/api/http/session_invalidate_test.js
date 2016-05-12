/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var session = require('api/http/session');

session.setAttribute("attr1", "Value1");
session.setAttribute("attr2", "Value2");

session.invalidate();

var names = session.getAttributeNames();

response.println("[Attribute Names]: " + names);
response.flush();
response.close();
