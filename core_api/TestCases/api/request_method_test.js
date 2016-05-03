/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var request = require('api/request');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
