/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FILE_PATH = '../temp/./..';

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testGetFile,
		testFileExists,
		testGetCanonicalPath,
		testGetPath,
		testGetName,
		testGetParent,
		testIsDirectory,
		testIsFile,
		testIsHidden,
		testLastModified,
		testFileLength
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testGetFile() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file);
}

function testFileExists() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertTrue(file.exists());
}

function testGetCanonicalPath() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file.getCanonicalPath());
}

function testGetPath() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file.getPath());
}

function testGetName() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file.getName());
}

function testGetParent() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file.getParent());
}

function testIsDirectory() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertTrue(file.isDirectory());
}

function testIsFile() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertFalse(file.isFile());
}

function testIsHidden() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertTrue(file.isHidden());
}

function testLastModified() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file.lastModified());
}

function testFileLength() {
	var file = files.get(TEST_FILE_PATH);
	assert.assertNotNull(file.length());
}