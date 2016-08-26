/* globals $ */
/* eslint-env node, dirigible */

var repository = require('service/repository');
var response = require('net/http/response');

// create a collection
repository.createCollection("/myRoot/myCollection");
response.println("Collection created.");
response.println("Collection exists? " + repository.hasCollection("/myRoot/myCollection"));

var collection = repository.getCollection("/myRoot/myCollection");
response.println("Collection is retrieved? " + (collection !== null));
response.println("Collection's Name: " + collection.getName());
response.println("Collection's Path: " + collection.getPath());

var parent = collection.getParent();
response.println("Parent Collection is retrieved? " + (parent != null));
response.println("Parent Collection's Name: " + parent.getName());
response.println("Parent Collection's Path: " + parent.getPath());

var child = collection.createCollection("myChild");
response.println("Child Collection is created? " + (child != null));
response.println("Child Collection's Name: " + child.getName());
response.println("Child Collection's Path: " + child.getPath());

// remove collection
repository.removeCollection("/myRoot/myCollection");

response.flush();
response.close();
