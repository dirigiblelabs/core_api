/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var zip = require('io/zip');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FILE_CONTENT = "Hello World!";

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testWriteZip
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testWriteZip() {
	
	var baos = streams.createByteArrayOutputStream();
	var zipOutputStream = zip.createZipOutputStream(baos);
	try {
		var zipEntry = zipOutputStream.createZipEntry("hello.txt");
		zipEntry.writeData(streams.textToByteArray(TEST_FILE_CONTENT));
		zipOutputStream.putNextEntry(zipEntry);
	} finally {
		zipOutputStream.close();
	}
	
	var bytes = baos.getBytes();
	console.info(bytes);
	
	assert.assertNotNull(bytes, 'The actual content bytes are null!');
	
//	response.setContentType("application/zip");
//	response.addHeader("Content-Disposition", "attachment;filename=\"myzip.zip\"");
//	response.writeStream(streams.createByteArrayInputStream(baos.getBytes()));
	
}
