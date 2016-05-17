/* globals $ */
/* eslint-env node, dirigible */

var uuid = require('api/utils/uuid');
var response = require('api/http/response');

response.println(uuid.randomUUID());
response.println(uuid.fromString('14a3ddce-f86d-4f51-a2e0-6e497b94bbe5'));

response.flush();
response.close();
