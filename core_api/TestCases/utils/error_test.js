/* globals $ */
/* eslint-env node, dirigible */

var errorUtils = require('utils/error');
var assert = require('core/assert');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = {
		'status': 'OK',
	};

	try {
		testErrorMessage();
		testStackTrace();
	} catch (e) {
		testResult.status = 'Failed';
		testResult.errorInfo = e;
	}

	response.println(JSON.stringify(testResult, null, 2));
	response.flush();
	response.close();
}

function testErrorMessage() {
	var expectedErrorMessage = 'Test Error Message';
	var error = errorUtils.createError(expectedErrorMessage);
	assert.assertNotNull(error, 'Ther error is null!');
	assert.assertEquals(expectedErrorMessage, error.message, 'The expected error message doesn\'t match the actual Error Message!' );
}

function testStackTrace() {
	var error = errorUtils.createError('Test Error Message');
	var stackTrace = error.stackTrace;
	assert.assertNotNull(stackTrace, 'The stack trace is null!');
	assert.assertTrue(stackTrace.length > 0, 'The stack trace is empty!');
}
