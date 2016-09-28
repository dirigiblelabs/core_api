/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');
var response = require('net/http/response');
var streams = require('io/streams');

var cmisSession = cmis.getSession();

var rootFolder = cmisSession.getRootFolder();

var children = rootFolder.getChildren();
response.println("Listing the children of the root folder:");
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
}


var textFileName = "test.txt";
response.println("Creating a simple text file, " + textFileName);

var mimetype = "text/plain; charset=UTF-8";
var content = "This is some test content.";
var filename = textFileName;

var outputStream = streams.createByteArrayOutputStream();
streams.writeText(outputStream, content);
var bytes = outputStream.getBytes();
var inputStream = streams.createByteArrayInputStream(bytes);

var contentStream = cmisSession.getObjectFactory().createContentStream(filename, bytes.length, mimetype, inputStream);

var properties = {};
properties[cmis.OBJECT_TYPE_ID] = "cmis:document";
properties[cmis.NAME] = filename;
var newDocument;
try {
	newDocument = rootFolder.createDocument(properties, contentStream, cmis.MAJOR);
} catch(e) {
	response.println("Error: " + e);
}

response.println("Document ID: " + newDocument.getId());

children = rootFolder.getChildren();
response.println("Listing the children of the root folder again:");
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
}

response.println("Deleting the newly created document");
if (newDocument) {
    newDocument.delete();
}

response.flush();
response.close();