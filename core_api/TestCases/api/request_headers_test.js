/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var request = require('api/request');

var header = request.getHeader("Accept");
var headerNames = request.getHeaderNames();

response.println("[Header] Accept: " + header);
response.println("[Header Names]: " + headerNames);
response.flush();
response.close();
