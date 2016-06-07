/* globals $ */
/* eslint-env node, dirigible */

var context = require('core/context');
var response = require('net/http/response');

context.set("attr1", "value1");
var attr = context.get("attr1");

response.println("[Attribute]: " + attr);
response.flush();
response.close();
