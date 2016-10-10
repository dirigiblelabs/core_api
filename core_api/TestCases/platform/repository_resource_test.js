/* globals $ */
/* eslint-env node, dirigible */

var repository = require('platform/repository');
var response = require('net/http/response');

var bytes = [83, 111, 109, 101, 32, 116, 101, 120, 116, 32, 99, 111, 110, 116, 101, 110, 116]; // Some text content

//create a resource
repository.createResource("/myRoot/myCollection/myResource.txt", bytes, false, "plain/text");
response.println("Resource created.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myResource.txt"));

var resource = repository.getResource("/myRoot/myCollection/myResource.txt");
response.println("Resource is retrieved? " + (resource !== null));
response.println("Resource's Name: " + resource.getName());
response.println("Resource's Path: " + resource.getPath());

var parent = resource.getParent();
response.println("Parent Collection is retrieved? " + (parent !== null));
response.println("Parent Collection's Name: " + parent.getName());
response.println("Parent Collection's Path: " + parent.getPath());

response.println("Resource content is: " + resource.getTextContent());
response.println("Resource content is binary?: " + resource.isBinary());
response.println("Resource content type is: " + resource.getContentType());

// remove resource
repository.removeResource("/myRoot/myCollection/myResource.txt");

response.flush();
response.close();
