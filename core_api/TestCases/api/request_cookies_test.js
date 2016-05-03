/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var request = require('api/request');

var cookies = request.getCookies();

response.println("[Cookies]: " + cookies);
response.flush();
response.close();
