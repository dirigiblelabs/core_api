/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_DIRECTORY_NAME = '../temp/tests/directory/';

executeTests();

function executeTests() {
	tests.after(cleanUp);
	var testResult = tests.execute([testDirectoryExits, testDirectoryCreate]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function cleanUp() {
	files.delete(TEST_DIRECTORY_NAME);
}

function testDirectoryExits() {
	var directory = files.get('../temp/notExistingDirectory');

	assert.assertNotNull(directory);
	assert.assertFalse(directory.exists());
}

function testDirectoryCreate() {
	files.createDirectory(TEST_DIRECTORY_NAME);

	var directory = files.get(TEST_DIRECTORY_NAME);
	assert.assertNotNull(directory);
	assert.assertTrue(directory.exists());
	assert.assertTrue(directory.isDirectory());
	assert.assertFalse(directory.isFile());
}