/* globals $ */
/* eslint-env node, dirigible */

var repository = require('platform/repository');
var response = require('net/http/response');

var bytes = [83, 111, 109, 101, 32, 116, 101, 120, 116, 32, 99, 111, 110, 116, 101, 110, 116]; // Some text content

// create a collection
repository.createCollection("/myRoot/myCollection");
response.println("Collection created.");
response.println("Collection exists? " + repository.hasCollection("/myRoot/myCollection"));

//create a resource
repository.createResource("/myRoot/myCollection/myResource.txt", bytes, false, "plain/text");
response.println("Resource created.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myResource.txt"));

// remove resource
repository.removeResource("/myRoot/myCollection/myResource.txt");
response.println("Resource removed.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myResource.txt"));

// remove collection
repository.removeCollection("/myRoot/myCollection");
response.println("Collection removed.");
response.println("Collection exists? " + repository.hasCollection("/myRoot/myCollection"));

response.flush();
response.close();
