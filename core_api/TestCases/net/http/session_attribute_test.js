/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

session.setAttribute("attr1", "Value1");
var attr = session.getAttribute("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
