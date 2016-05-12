/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var request = require('api/http/request');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
