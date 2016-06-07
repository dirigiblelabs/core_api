/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
