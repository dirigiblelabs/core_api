/* globals $ */
/* eslint-env node, dirigible */

var generator = require('gen/generator');
var response = require('net/http/response');

var genWorker = generator.getWorker(generator.WORKER_CATEGORY_WEB_CONTENT);
response.println(genWorker.getTemplates());

response.flush();
response.close();

