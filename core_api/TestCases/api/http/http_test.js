/* globals $ */
/* eslint-env node, dirigible */

var http = require('api/http/client');
var response = require('api/http/response');

var options = {
    method: 'GET', // default
    host: 'http://services.odata.org',
    port: 80,
    path: '/V4/Northwind/Northwind.svc/',
    binary: false 
};

var httpResponse = http.request(options);

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
