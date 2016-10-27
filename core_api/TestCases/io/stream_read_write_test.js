/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_CONTENT = 'Some text content';
const TEST_CONTENT_BYTES = [83, 111, 109, 101, 32, 116, 101, 120, 116, 32, 99, 111, 110, 116, 101, 110, 116];

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testByteArrayOutputStreamGetBytes,
		testByteArrayOutputStreamGetText,
		testCopyStreamGetBytes,
		testCopyStreamGetText
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testByteArrayOutputStreamGetBytes() {
	var expectedContentBytes = TEST_CONTENT_BYTES;

	var outputStream = streams.createByteArrayOutputStream();
	streams.writeText(outputStream, TEST_CONTENT);

	var actualContentBytes = outputStream.getBytes();
	assert.assertNotNull(actualContentBytes, 'The actual content bytes are null!');
	assert.assertEquals(expectedContentBytes, actualContentBytes, 'The expected content bytes does not match the actual content bytes!');
}

function testByteArrayOutputStreamGetText() {
	var expectedContent = TEST_CONTENT;

	var outputStream = streams.createByteArrayOutputStream();
	streams.writeText(outputStream, expectedContent);

	var actualContent = outputStream.getText();
	assert.assertNotNull(actualContent, 'The actual content is null!');
	assert.assertEquals(expectedContent, actualContent, 'The expected content does not match the actual content!');
}

function testCopyStreamGetBytes() {
	var expectedBytes = TEST_CONTENT_BYTES;

	var inputStream = streams.createByteArrayInputStream(expectedBytes);
	var outputStreamCopy = streams.createByteArrayOutputStream();

	streams.copy(inputStream, outputStreamCopy);

	var actualBytes = outputStreamCopy.getBytes();
	assert.assertNotNull(actualBytes, 'The actual bytes are null!');
	assert.assertEquals(expectedBytes, actualBytes, ' The expected content bytes does not match the actual content bytes!');
}

function testCopyStreamGetText() {
	var expectedContent = TEST_CONTENT;

	var inputStream = streams.createByteArrayInputStream(TEST_CONTENT_BYTES);
	var outputStreamCopy = streams.createByteArrayOutputStream();

	streams.copy(inputStream, outputStreamCopy);

	var actualContent = outputStreamCopy.getText();
	assert.assertNotNull(actualContent, 'The actual bytes are null!');
	assert.assertEquals(expectedContent, expectedContent, 'The expected content does not match the actual content!');
}