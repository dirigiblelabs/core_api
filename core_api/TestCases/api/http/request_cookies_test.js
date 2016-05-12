/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var request = require('api/http/request');

var cookies = request.getCookies();

response.println("[Cookies]: " + cookies);
response.flush();
response.close();
