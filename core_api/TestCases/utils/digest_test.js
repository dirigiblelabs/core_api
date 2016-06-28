/* globals $ */
/* eslint-env node, dirigible */

var digest = require('utils/digest');
var response = require('net/http/response');

console.log("256: " + digest.sha256('admin:admin'));
console.log("512: " + digest.sha512('admin:admin'));

response.println("256: " + digest.sha256('admin:admin'));
response.println("512: " + digest.sha512('admin:admin'));

response.flush();
response.close();
