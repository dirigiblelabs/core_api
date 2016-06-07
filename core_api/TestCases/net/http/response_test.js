/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');

response.println("Hello World!");
response.flush();
response.close();
