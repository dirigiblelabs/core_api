/* globals $ */
/* eslint-env node, dirigible */

var config = require('core/config');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

config.set('/path/to/property', 'key1', 'value1');
executeTests();

function executeTests() {
	var testResult = tests.execute([testSetProperty, testSetProperties]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testSetProperty() {
	var expectedPath = '/path/to/property';
	var expectedKey = 'key1';
	var expectedValue = 'value1';

	config.set(expectedPath, expectedKey, expectedValue);

	var actualValue = config.get(expectedPath, expectedKey);
	assert.assertNotNull(actualValue, 'The actual property is null!');
}

function testSetProperties() {
	var expectedPath = '/path/to/properties';
	var expectedProperties = {
		'property1': 'value1'
	};

	config.setJson(expectedPath, JSON.stringify(expectedProperties));

	var actualProperties = config.getJson('/path/to/properties');
	assert.assertNotNull(actualProperties, 'The actual property is null!');
	assert.assertEquals(expectedProperties, JSON.parse(actualProperties), 'The expected properties doesn\'t match the actual properties!');
}
