/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var request = require('api/request');

var isUserInRole = request.isUserInRole("Developer");

response.println("[IsUserInRole]: " + isUserInRole);
response.flush();
response.close();
