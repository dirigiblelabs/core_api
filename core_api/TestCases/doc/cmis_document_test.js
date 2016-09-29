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
properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
properties[cmis.NAME] = filename;
var newDocument;
try {
	newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
} catch(e) {
	response.println("Error: " + e);
}
var documentId = newDocument.getId();
response.println("Document ID: " + documentId);

children = rootFolder.getChildren();
response.println("Listing the children of the root folder again:");
for (var i in children) {
	response.println("Object ID: " + children[i].getId());
	response.println("Object Name: " + children[i].getName());
	response.println("Object Type: " + children[i].getType());
}

// Get the contents of the file
var doc = cmisSession.getObject(documentId);
contentStream = doc.getContentStream(); // returns null if the document has no content
if (contentStream !== null) {
    content = streams.readText(contentStream.getStream());
    response.println("Contents of " + filename + " are: " + content);
} else {
    response.println("No content.");
}

response.println("Deleting the newly created document");
if (newDocument) {
    newDocument.delete();
}

response.flush();
response.close();
