/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');

response.println("Hello World!");
response.flush();
response.close();