/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');

var assert = require('core/assert');
var tests = require('service/tests');
var streams = require('io/streams');
var response = require('net/http/response');

const TEST_DOCUMENT_NAME = 'NewDocument.txt';

executeTests();

function executeTests() {
	tests.before(setUp);
	var testResult = tests.execute([testCreateDocument, testDeleteDocument]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function setUp() {
	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();
	var childern = rootFolder.getChildren();

	for (var i = 0 ; i < childern.length; i ++) {
		if (childern[i].getName() === TEST_DOCUMENT_NAME) {
			childern[i].delete();
		}
	}
}

function testCreateDocument() {
	var expectedDocumentName = TEST_DOCUMENT_NAME;
	var expectedContent = 'This is some test content.';

	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();

	var outputStream = streams.createByteArrayOutputStream();
	streams.writeText(outputStream, expectedContent);
	var bytes = outputStream.getBytes();
	var inputStream = streams.createByteArrayInputStream(bytes);

	var contentStream = cmisSession.getObjectFactory().createContentStream(expectedDocumentName, bytes.length, 'text/plain; charset=UTF-8', inputStream);
	
	var properties = {};
	properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
	properties[cmis.NAME] = TEST_DOCUMENT_NAME;
	var newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);

	assert.assertNotNull(newDocument, 'The new document is null!');
	assert.assertEquals(expectedDocumentName, newDocument.getName(), 'The expected document name does not match the actual document name!');

	contentStream = newDocument.getContentStream();
	assert.assertNotNull(contentStream, 'The content stream is null!');

	var actualContent = streams.readText(contentStream.getStream());
    assert.assertEquals(expectedContent, actualContent, 'The expected content does not match the actual content!');
}

function testDeleteDocument() {
	var expectedDocumentName = TEST_DOCUMENT_NAME;
	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();

	var outputStream = streams.createByteArrayOutputStream();
	streams.writeText(outputStream, '');
	var bytes = outputStream.getBytes();
	var inputStream = streams.createByteArrayInputStream(bytes);

	var contentStream = cmisSession.getObjectFactory().createContentStream(expectedDocumentName, bytes.length, 'text/plain; charset=UTF-8', inputStream);
	
	var properties = {};
	properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_DOCUMENT;
	properties[cmis.NAME] = TEST_DOCUMENT_NAME;
	var newDocument = rootFolder.createDocument(properties, contentStream, cmis.VERSIONING_STATE_MAJOR);
	
	newDocument.delete();

	var childern = rootFolder.getChildren();
	for (var i = 0 ; i < childern.length; i ++) {
		if (childern[i].getName() === TEST_DOCUMENT_NAME) {
			assert.fail('The document was not deleted!');
		}
	}
}