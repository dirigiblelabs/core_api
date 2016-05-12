/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var request = require('api/http/request');

var parameter  = request.getParameter("name");
var parameterNames = request.getParameterNames();
var parameters = request.getParameters();

response.println("[Parameter]: " + parameter);
response.println("[Parameter Names]: " + parameterNames);
response.println("[Parameters]: " + parameters);
response.flush();
response.close();
