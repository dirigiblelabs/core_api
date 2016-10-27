/* globals $ */
/* eslint-env node, dirigible */

var hex = require('utils/hex');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_PLAIN_TEXT = 'Hex Encoded';
const TEST_ENCODED_TEXT = '48657820456e636f646564';

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
	var encoded = hex.encode(TEST_PLAIN_TEXT);
	assert.assertNotNull(encoded);
	assert.assertEquals(TEST_ENCODED_TEXT, encoded);
}

function testDecode() {
	var decoded = hex.decode(TEST_ENCODED_TEXT);
	assert.assertNotNull(decoded);
	assert.assertEquals(TEST_PLAIN_TEXT, decoded);
}