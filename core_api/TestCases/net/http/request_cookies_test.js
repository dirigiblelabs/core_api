/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var cookies = request.getCookies();

response.println("[Cookies]: " + JSON.stringify(cookies));
response.flush();
response.close();
