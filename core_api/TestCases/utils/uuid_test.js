/* globals $ */
/* eslint-env node, dirigible */

var uuid = require('utils/uuid');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testRandom,
		testValidate
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testRandom() {
	assert.assertNotNull(uuid.random());
}

function testValidate() {
	assert.assertTrue(uuid.validate('14a3ddce-f86d-4f51-a2e0-6e497b94bbe5'));
}
