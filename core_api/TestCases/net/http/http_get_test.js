/* globals $ */
/* eslint-env node, dirigible */

var http = require('net/http/client');
var response = require('net/http/response');

var httpResponse = http.get('http://services.odata.org/V4/Northwind/Northwind.svc/');

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
