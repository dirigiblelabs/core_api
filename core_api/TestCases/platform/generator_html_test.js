/* globals $ */
/* eslint-env node, dirigible */

var generator = require('platform/generator');
var response = require('net/http/response');

var genWorker = generator.getWorker(generator.WORKER_CATEGORY_WEB_CONTENT);

var parameters = {
  "templateType":"index_page",
  "fileName":"index.html",
  "projectName":"myproject1",
  "packageName":"mypackage1",
  "pageTitle":"My Programmatically Created Page"
};

genWorker.generate(parameters);

response.println("done - 'index.html' in 'myproject1' under 'mypackage1'");

response.flush();
response.close();

