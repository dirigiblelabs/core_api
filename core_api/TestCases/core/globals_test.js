/* globals $ */
/* eslint-env node, dirigible */

var globals = require('core/globals');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([testGetGlobals, testSetGlobals]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testGetGlobals() {
	var expectedGlobalAttribute = globals.get('notDefinedAttribute');
	assert.assertNull(expectedGlobalAttribute, 'The expected global attribute should be null!');
}

function testSetGlobals() {
	var expectedGlobalAttributeName = 'testAttributeName';
	var expectedGlobalAttributeValue = 'testAttributeValue';

	globals.set(expectedGlobalAttributeName, expectedGlobalAttributeValue);

	var actualGlobalAttributeValue = globals.get(expectedGlobalAttributeName);
	assert.assertNotNull(actualGlobalAttributeValue, 'The expected global attribute value is null!');
	assert.assertEquals(expectedGlobalAttributeValue, actualGlobalAttributeValue, 'The expected global attribute value does not match the actual global attribute value!');
}