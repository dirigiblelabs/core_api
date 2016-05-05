/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var session = require('api/session');

session.setAttribute("attr1", "Value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
