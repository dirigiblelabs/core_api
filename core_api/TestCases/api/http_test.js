/* globals $ */
/* eslint-env node, dirigible */

var http = require('api/http');
var response = require('api/response');

var options = {
    host: 'http://services.odata.org',
    port: 80,
    path: '/V4/Northwind/Northwind.svc/',
    binary: false 
};

var httpResponse = http.get(options);

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();