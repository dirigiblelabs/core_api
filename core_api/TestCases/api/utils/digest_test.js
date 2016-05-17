/* globals $ */
/* eslint-env node, dirigible */

var digest = require('api/utils/digest');
var response = require('api/http/response');

response.println("" + digest.sha256('admin:admin'));
response.println("" + digest.sha512('YWRtaW46YWRtaW4='));

response.flush();
response.close();
