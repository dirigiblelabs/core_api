/* globals $ */
/* eslint-env node, dirigible */

var digest = require('utils/digest');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_PLAIN_TEXT = 'admin:admin';
const TEST_ENCODED_256 = [-115, -95, -109, 54, 110, 21, 84, -64, -117, 40, 112, -59, 15, 115, 123, -107, -121, -61, 55, 43, 101, 97, 81, -60, -87, 96, 40, -81, 38, -11, 19, 52];
const TEST_ENCODED_512 = [103, 5, 6, -55, -74, 115, 117, 0, 126, 27, 80, -42, -104, 8, 94, 84, -68, -42, -24, -68, 106, 127, -20, -30, -87, 7, -1, 66, -72, 58, -110, 105, -127, 71, 70, 13, -18, 102, -63, -123, 106, -55, 119, 120, 117, -57, -16, -27, -79, -19, -84, 87, 72, 110, 122, -124, 19, 17, -22, 107, -18, -78, 53, -94];

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testEncode256,
		testEncode512
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testEncode256() {
	var encoded = digest.sha256(TEST_PLAIN_TEXT);
	assert.assertNotNull(encoded);
	assert.assertEquals(TEST_ENCODED_256, encoded);
}

function testEncode512() {
	var encoded = digest.sha512(TEST_PLAIN_TEXT);
	assert.assertNotNull(encoded);
	assert.assertEquals(TEST_ENCODED_512, encoded);
}