/* globals $ */
/* eslint-env node, dirigible */

var base64 = require('utils/base64');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_PLAIN_TEXT = 'admin:admin';
const TEST_ENCODED_TEXT = 'YWRtaW46YWRtaW4=';

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testEncode,
		testDecode
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testEncode() {
	var encoded = base64.encode(TEST_PLAIN_TEXT);
	assert.assertNotNull(encoded);
	assert.assertEquals(TEST_ENCODED_TEXT, encoded);
}

function testDecode() {
	var decoded = base64.decode(TEST_ENCODED_TEXT);
	assert.assertNotNull(decoded);
	assert.assertEquals(TEST_PLAIN_TEXT, decoded);
}