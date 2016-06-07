/* globals $ */
/* eslint-env node, dirigible */

var digest = require('utils/digest');
var response = require('http/response');

response.println("" + digest.sha256('admin:admin'));
response.println("" + digest.sha512('YWRtaW46YWRtaW4='));

response.flush();
response.close();
