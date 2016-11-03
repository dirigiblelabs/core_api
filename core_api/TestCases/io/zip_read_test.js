/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var zip = require('io/zip');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_ZIP_BYTES = [80,75,3,4,20,0,8,0,8,0,74,-126,99,73,0,0,0,0,0,0,0,0,0,0,0,0,9,0,16,0,104,101,108,108,111,46,116,120,116,85,88,12,0,90,71,27,88,43,71,27,88,-28,-103,0,0,-13,72,-51,-55,-55,87,8,-49,47,-54,73,81,4,0,80,75,7,8,-93,28,41,28,14,0,0,0,12,0,0,0,80,75,1,2,21,3,20,0,8,0,8,0,74,-126,99,73,-93,28,41,28,14,0,0,0,12,0,0,0,9,0,12,0,0,0,0,0,0,0,0,64,-92,-127,0,0,0,0,104,101,108,108,111,46,116,120,116,85,88,8,0,90,71,27,88,43,71,27,88,80,75,5,6,0,0,0,0,1,0,1,0,67,0,0,0,85,0,0,0,0,0];
const TEST_FILE_CONTENT = "Hello World!";

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testReadZip
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testReadZip() {
	var expectedContent = TEST_FILE_CONTENT;
	
	var zipInputStream = zip.createZipInputStream(streams.createByteArrayInputStream(TEST_ZIP_BYTES));
	var zipEntry = null;
	try {
		zipEntry = zipInputStream.getNextEntry();
		while (zipEntry.isValid()) {
			var path = zipEntry.getName();
			console.info(path);
			var bytes = zipEntry.readData();
			var text = streams.byteArrayToText(bytes);
			console.info(text);
			assert.assertNotNull(bytes, 'The actual content bytes are null!');
			assert.assertEquals(expectedContent, text, 'The expected content does not match the actual content bytes!');
			zipEntry = zipInputStream.getNextEntry();
		}
	} finally {
		zipInputStream.close();
	}
	
}
