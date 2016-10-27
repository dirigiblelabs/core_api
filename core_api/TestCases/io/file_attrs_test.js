/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FILE_PATH = '../temp';

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testExecutable,
		testReadable,
		testWritable
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testExecutable() {
	var file = files.get(TEST_FILE_PATH);

	assert.assertNotNull(file);
	assert.assertNotNull(file.isExecutable());

	file.setExecutable(false);
	assert.assertFalse(file.isExecutable());

	file.setExecutable(true);
	assert.assertTrue(file.isExecutable());
}

function testReadable() {
	var file = files.get(TEST_FILE_PATH);

	assert.assertNotNull(file);
	assert.assertNotNull(file.isReadable());

	file.setReadable(false);
	assert.assertFalse(file.isReadable());

	file.setReadable(true);
	assert.assertTrue(file.isReadable());
}

function testWritable() {
	var file = files.get(TEST_FILE_PATH);

	assert.assertNotNull(file);
	assert.assertNotNull(file.isWritable());

	file.setWritable(false);
	assert.assertFalse(file.isWritable());

	file.setWritable(true);
	assert.assertTrue(file.isWritable());
}