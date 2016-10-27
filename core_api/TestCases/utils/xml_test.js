/* globals $ */
/* eslint-env node, dirigible */

var xml = require('utils/xml');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_JSON = {
	'firstName': 'John',
	'lastName': 'Doe',
	'bio': {
		'age': 24
	}
};

const TEST_XML = 
	"<firstName>John</firstName>" +
	"<lastName>Doe</lastName>" + 
	"<bio>" + 
	"<age>24</age>" +
	"</bio>";

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testFromJson,
		testToJson
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testFromJson() {
	var actualXml = xml.fromJson(TEST_JSON);
	assert.assertNotNull(actualXml);
	assert.assertEquals(TEST_XML, actualXml);
}

function testToJson() {
	var actualJson = xml.toJson(TEST_XML);
	assert.assertNotNull(actualJson);
	assert.assertEquals(JSON.stringify(TEST_JSON), actualJson);
}