/* globals $ */
/* eslint-env node, dirigible */

var httpClient = require('api/http').httpClient;
var response = require('api/http').response;

var httpResult = httpClient.get('http://services.odata.org/V4/Northwind/Northwind.svc/');

response.println(httpResult.statusMessage);
response.println(httpResult.data);
response.flush();
response.close();
