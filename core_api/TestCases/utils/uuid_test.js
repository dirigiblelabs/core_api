/* globals $ */
/* eslint-env node, dirigible */

var uuid = require('utils/uuid');
var response = require('net/http/response');

response.println(uuid.randomUUID());
response.println(uuid.validate('14a3ddce-f86d-4f51-a2e0-6e497b94bbe5'));

response.flush();
response.close();
