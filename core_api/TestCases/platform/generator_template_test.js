/* globals $ */
/* eslint-env node, dirigible */

var generator = require('platform/generator');
var response = require('net/http/response');

var template = "<html><body><h1>${caption}</h1></body></html>";
var parameters = {"caption": "Hello World!"};
var generated = generator.generate(template, parameters);
response.println(generated);

response.flush();
response.close();

