/* globals $ */
/* eslint-env node, dirigible */

var files = require('api/files');
var response = require('api/http/response');

var file = files.get("../temp/./..");

response.println("[File List]: " + file.list());
response.println("[File List Roots]: " + file.listRoots());
response.println("[File Filter]: " + file.filter("I"));

response.flush();
response.close();
