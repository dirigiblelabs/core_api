/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');
var response = require('net/http/response');

var cmisSession = cmis.getSession();

var rootFolder = cmisSession.getRootFolder();
var children = rootFolder.getChildren();
response.println("Listing the children of the root folder:");
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
}

response.println("Creating a child folder");
var properties = {};
properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_FOLDER;
properties[cmis.NAME] = "NewFolder";
var newFolder;
try {
	newFolder = rootFolder.createFolder(properties);
} catch(e) {
	response.println("Error: " + e);
}

response.println("Listing the children of the root folder again:");
children = rootFolder.getChildren();
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
}

response.println("Deleting the newly created folder");
if (newFolder) {
    newFolder.delete();
}

response.flush();
response.close();

