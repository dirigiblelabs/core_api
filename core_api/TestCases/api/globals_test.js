/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var globals = require('api/globals');

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
