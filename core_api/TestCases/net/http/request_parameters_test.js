/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var parameter  = request.getParameter("name");
var parameterNames = request.getParameterNames();
var parameters = request.getParameters();

response.println("[Parameter]: " + parameter);
response.println("[Parameter Names]: " + JSON.stringify(parameterNames));
response.println("[Parameters]: " + JSON.stringify(parameters));
response.flush();
response.close();
