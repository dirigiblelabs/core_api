/* globals $ */
/* eslint-env node, dirigible */

var globals = require('core/globals');
var response = require('net/http/response');

globals.set("attr1", "value1");
var attr = globals.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
