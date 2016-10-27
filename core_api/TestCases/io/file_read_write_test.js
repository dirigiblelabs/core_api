/* globals $ */
/* eslint-env node, dirigible */
var files = require('io/files');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FILE_NAME = '../testFile.txt';
const TEST_CONTENT = 'Hello World!';
const TEST_CONTENT_BYTES = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33];

executeTests();

function executeTests() {
	tests.after(cleanUp);
	var testResult = tests.execute([
		testGetFile,
		testCreateFile,
		testRead,
		testReadText,
		testWrite,
		testWriteText
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function cleanUp() {
	files.delete(TEST_FILE_NAME);
}

function testGetFile() {
	var file = files.get('../temp/tests/testFileThatDoesNotExists.txt');
	assert.assertNotNull(file);
	assert.assertFalse(file.exists());
}

function testCreateFile() {
	var expectedFileDirectory = TEST_FILE_NAME;

	files.createFile(expectedFileDirectory);

	 var file = files.get(expectedFileDirectory);
	 assert.assertTrue(file.exists());
	 assert.assertTrue(file.isFile());
}

function testRead() {
	var expectedBytes = [];

	files.createFile(TEST_FILE_NAME);
	var actualBytes = files.read(TEST_FILE_NAME);

	assert.assertNotNull(actualBytes);
	assert.assertEquals(expectedBytes, actualBytes);
}

function testReadText() {
	var expectedContent = '';

	files.createFile(TEST_FILE_NAME);
	var actualContent = files.readText(TEST_FILE_NAME);

	assert.assertNotNull(actualContent);
	assert.assertEquals(expectedContent, actualContent);
}

function testWrite() {
	var expectedBytes = TEST_CONTENT_BYTES;

	files.createFile(TEST_FILE_NAME);
	files.write(TEST_FILE_NAME, TEST_CONTENT_BYTES);

	var actualBytes = files.read(TEST_FILE_NAME);
	assert.assertNotNull(actualBytes);
	assert.assertEquals(expectedBytes, actualBytes);
}

function testWriteText() {
	var expectedContent = TEST_CONTENT;

	files.createFile(TEST_FILE_NAME);
	files.writeText(TEST_FILE_NAME, expectedContent);

	var actualContent = files.readText(TEST_FILE_NAME);
	assert.assertNotNull(actualContent);
	assert.assertEquals(expectedContent, actualContent);
}