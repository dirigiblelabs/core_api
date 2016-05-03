/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');
var request = require('api/request');

var info = request.getInfo();

response.println("[Info]: " + info);
response.flush();
response.close();
