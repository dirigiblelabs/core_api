/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var request = require('api/http/request');

var isUserInRole = request.isUserInRole("Developer");

response.println("[IsUserInRole]: " + isUserInRole);
response.flush();
response.close();
