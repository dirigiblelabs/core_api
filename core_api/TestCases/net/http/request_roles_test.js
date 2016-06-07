/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var isUserInRole = request.isUserInRole("Developer");

response.println("[IsUserInRole]: " + isUserInRole);
response.flush();
response.close();
