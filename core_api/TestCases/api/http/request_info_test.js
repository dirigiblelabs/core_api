/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var request = require('api/http/request');

var info = request.getInfo();

response.println("[Info]: " + info);
response.flush();
response.close();
