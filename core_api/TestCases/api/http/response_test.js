/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');

response.println("Hello World!");
response.flush();
response.close();
