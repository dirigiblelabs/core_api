/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FILE_NAME = '../temp/testFile.txt';
const TEST_COPY_FILE_NAME = '../temp/copyTestFile.txt';
const TEST_CONTENT = 'Hello World!';

executeTests();

function executeTests() {
	tests.after(cleanUp);
	var testResult = tests.execute([testCopy, testMove]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function cleanUp() {
	files.delete(TEST_FILE_NAME);
	files.delete(TEST_COPY_FILE_NAME);
}

function testCopy() {
	files.createFile(TEST_FILE_NAME);
	files.writeText(TEST_FILE_NAME, TEST_CONTENT);

	var copyFile = files.get(TEST_COPY_FILE_NAME);
	assert.assertNotNull(copyFile);
	assert.assertFalse(copyFile.exists());

	files.copy(TEST_FILE_NAME, TEST_COPY_FILE_NAME);

	assert.assertTrue(copyFile.exists());

	var actualContent = files.readText(TEST_COPY_FILE_NAME);
	assert.assertNotNull(actualContent);
	assert.assertEquals(TEST_CONTENT, actualContent);
}

function testMove() {
	files.createFile(TEST_FILE_NAME);
	files.writeText(TEST_FILE_NAME, TEST_CONTENT);

	var originalFile = files.get(TEST_FILE_NAME);
	assert.assertNotNull(originalFile);
	assert.assertTrue(originalFile.exists());

	var moveFile = files.get(TEST_COPY_FILE_NAME);
	assert.assertNotNull(moveFile);
	assert.assertFalse(moveFile.exists());

	files.move(TEST_FILE_NAME, TEST_COPY_FILE_NAME);

	assert.assertTrue(moveFile.exists());
	assert.assertFalse(originalFile.exists());

	var actualContent = files.readText(TEST_COPY_FILE_NAME);
	assert.assertNotNull(actualContent);
	assert.assertEquals(TEST_CONTENT, actualContent);
}