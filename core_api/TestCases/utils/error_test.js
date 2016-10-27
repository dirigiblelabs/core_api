/* globals $ */
/* eslint-env node, dirigible */

var errorUtils = require('utils/error');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testErrorMessage,
		testStackTrace
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
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
