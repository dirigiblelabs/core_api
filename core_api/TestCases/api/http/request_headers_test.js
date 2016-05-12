/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var request = require('api/http/request');

var header = request.getHeader("Accept");
var headerNames = request.getHeaderNames();

response.println("[Header] Accept: " + header);
response.println("[Header Names]: " + headerNames);
response.flush();
response.close();
