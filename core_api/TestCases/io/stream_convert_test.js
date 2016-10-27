/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_CONTENT = 'Hello World!';
const TEST_CONTENT_BYTES = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33];

executeTests();

function executeTests() {
	var testResult = tests.execute([testTextToByteArray, testByteArrayToText]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testTextToByteArray() {
	var expectedContentBytes = TEST_CONTENT_BYTES;

	var actualContentBytes = streams.textToByteArray(TEST_CONTENT);
	assert.assertNotNull(actualContentBytes, 'The actual content bytes are null!');
	assert.assertEquals(expectedContentBytes, actualContentBytes, 'The expected content bytes does not match the actual content bytes!');
}

function testByteArrayToText() {
	var expectedContent = TEST_CONTENT;

	var actualContent = streams.byteArrayToText(TEST_CONTENT_BYTES);
	assert.assertNotNull(actualContent, 'The actual content sinull!');
	assert.assertEquals(expectedContent, actualContent, 'The expected content does not match the actual content!');
}