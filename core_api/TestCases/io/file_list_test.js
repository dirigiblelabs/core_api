/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FOLDER_NAME = '../temp/./..';

executeTests();

function executeTests() {
	var testResult = tests.execute([testFileList, testFileListRoots, testFileFilter]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testFileList() {
	var folder = files.get(TEST_FOLDER_NAME);
	var list = folder.list();

	assert.assertNotNull(list);
}

function testFileListRoots() {
	var folder = files.get(TEST_FOLDER_NAME);
	var list = folder.listRoots();

	assert.assertNotNull(list);
}

function testFileFilter() {
	var folder = files.get(TEST_FOLDER_NAME);
	var filter = folder.filter('I');

	assert.assertNotNull(filter);
}