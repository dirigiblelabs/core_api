/* globals $ */
/* eslint-env node, dirigible */

var http = require('net/http/client');
var response = require('net/http/response');

var options = {
    method: 'GET', // default
    host: 'http://services.odata.org',
    port: 80,
    path: '/V4/Northwind/Northwind.svc/',
    binary: false 
};

var httpResponse = http.request(options);

var assert = require("assert");
assert.assertEquals(1, 1);

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
