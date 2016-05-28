/* globals $ */
/* eslint-env node, dirigible */

var globals = require('api/globals');
var response = require('api/http/response');

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
