/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var input = request.readInputText();

response.println("[Input]: " + input);
response.flush();
response.close();
