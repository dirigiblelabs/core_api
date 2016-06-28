/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var info = request.getInfo();

response.println("[Info]: " + JSON.stringify(info));
response.flush();
response.close();
