/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var header = request.getHeader("Accept");
var headerNames = request.getHeaderNames();

response.println("[Header] Accept: " + header);
response.println("[Header Names]: " + headerNames);
response.flush();
response.close();
