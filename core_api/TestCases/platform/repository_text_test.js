/* globals $ */
/* eslint-env node, dirigible */

var repository = require('platform/repository');
var response = require('net/http/response');

// create a collection
repository.createCollection("/myRoot/myCollection");

//create a text resource
repository.createTextResource("/myRoot/myCollection/myTextResource.txt", "Text content");
response.println("Resource created.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myTextResource.txt"));

// remove resource
repository.removeResource("/myRoot/myCollection/myTextResource.txt");
response.println("Resource removed.");
response.println("Resource exists? " + repository.hasResource("/myRoot/myCollection/myResource.txt"));

// remove collection
repository.removeCollection("/myRoot/myCollection");

response.flush();
response.close();
