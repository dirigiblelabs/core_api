/* globals $ */
/* eslint-env node, dirigible */

var base64 = require('utils/base64');
var response = require('net/http/response');

response.println(base64.encode('admin:admin'));
response.println(base64.decode('YWRtaW46YWRtaW4='));

response.flush();
response.close();
