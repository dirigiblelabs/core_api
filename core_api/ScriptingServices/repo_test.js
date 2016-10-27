/* globals $ */
/* eslint-env node, dirigible */

var repository = require('platform/repository');
var response = require('net/http/response');

var helloWorldTemplate = repository.getResource('db/dirigible/templates/ScriptingServices/js_hello_world/template.json');
response.println(helloWorldTemplate.getTextContent());

var templates = repository.getCollection('db/dirigible/templates/ScriptingServices/');

console.log(templates.getCollections()[0].getCollections());
var counter = 0;
// test(templates);


function test(collection) {
	console.log(counter++);
	var collections = collection.getCollections();
	if (collections.length === 0) {
		console.log(collections.getResourceNames());
	}
	for (var i = 0; i < collections.length; i ++) {
		test(collection[i]);
	}
}