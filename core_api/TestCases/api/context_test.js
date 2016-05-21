/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var context = require('api/context');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
