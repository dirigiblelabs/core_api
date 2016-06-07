/* globals $ */
/* eslint-env node, dirigible */

var hex = require('utils/hex');
var response = require('net/http/response');

response.println(hex.encode('Hex Encoded'));
response.println(hex.decode('48657820456e636f646564'));

response.flush();
response.close();
