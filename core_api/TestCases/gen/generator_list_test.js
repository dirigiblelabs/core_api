/* globals $ */
/* eslint-env node, dirigible */

var generator = require('gen/generator');
var response = require('net/http/response');

var genWorker = generator.getWorker(generator.WORKER_TYPE_DATA_STRUCTURES);
response.println(genWorker.getTemplates());

response.flush();
response.close();

