/* globals $ */
/* eslint-env node, dirigible */

var context = require('core/context');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([testGetContext, testSetContext]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testGetContext() {
	var expectedContextAttribute = context.get('notDefinedAttribute');
	assert.assertNull(expectedContextAttribute, 'The expected context attribute should be null!');
}

function testSetContext() {
	var expectedContextAttributeName = 'testAttributeName';
	var expectedContextAttributeValue = 'testAttributeValue';

	context.set(expectedContextAttributeName, expectedContextAttributeValue);

	var actualContextAttributeValue = context.get(expectedContextAttributeName);
	assert.assertNotNull(actualContextAttributeValue, 'The expected context attribute value is null!');
	assert.assertEquals(expectedContextAttributeValue, actualContextAttributeValue, 'The expected context attribute value does not match the actual context attribute value!');
}