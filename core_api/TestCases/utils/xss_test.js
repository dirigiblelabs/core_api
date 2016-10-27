/* globals $ */
/* eslint-env node, dirigible */

var xss = require('utils/xss');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testEscapeCsv,
		testEscapeHtml,
		testEscapeJavaScript,
		testEscapeSql,
		testEscapeXml
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testEscapeCsv() {
	var expectedOutput = '"a\'b,c|d;e""f"';
	var actualOutput = xss.escapeCsv('a\'b,c|d;e"f');

	assert.assertNotNull(actualOutput);
	assert.assertEquals(expectedOutput, actualOutput);
}

function testEscapeHtml() {
	var expectedOutput = '&lt;br&gt;&lt;lt&gt;';
	var actualOutput = xss.escapeHtml('<br><lt>');

	assert.assertNotNull(actualOutput);
	assert.assertEquals(expectedOutput, actualOutput);
}

function testEscapeJavaScript() {
	var expectedOutput = '<script>alert(\\\"XSS Test\\\");<\\/alert>';
	var actualOutput = xss.escapeJavaScript('<script>alert("XSS Test");</alert>');

	assert.assertNotNull(actualOutput);
	assert.assertEquals(expectedOutput, actualOutput);
}

function testEscapeSql() {
	var expectedOutput = 'John\'\'s bag';
	var actualOutput = xss.escapeSql('John\'s bag');

	assert.assertNotNull(actualOutput);
	assert.assertEquals(expectedOutput, actualOutput);
}

function testEscapeXml() {
	var expectedOutput = '&lt;tag&gt;';
	var actualOutput = xss.escapeXml('<tag>');

	assert.assertNotNull(actualOutput);
	assert.assertEquals(expectedOutput, actualOutput);
}