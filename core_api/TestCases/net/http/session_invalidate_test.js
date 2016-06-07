/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

session.setAttribute("attr1", "Value1");
session.setAttribute("attr2", "Value2");

session.invalidate();

var names = session.getAttributeNames();

response.println("[Attribute Names]: " + names);
response.flush();
response.close();
