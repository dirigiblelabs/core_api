/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_FOLDER_NAME = 'NewFolder';

executeTests();

function executeTests() {
	tests.before(setUp);
	var testResult = tests.execute([testGetRootFolder, testGetChildren, testCreateFolder, testDeleteFolder]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function setUp() {
	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();
	var childern = rootFolder.getChildren();

	for (var i = 0 ; i < childern.length; i ++) {
		if (childern[i].getName() === TEST_FOLDER_NAME) {
			childern[i].delete();
		}
	}
}

function testGetRootFolder() {
	var expectedRootFolderId = '/';
	var expectedRootFolderPath = '/';
	var expectedRootFolderName = 'root';

	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();

	assert.assertNotNull(rootFolder);
	assert.assertTrue(rootFolder.isRootFolder(), 'This is not a root folder!');

	var actualRootFolderId = rootFolder.getId();
	var actualRootFolderPath = rootFolder.getPath();	
	var actualRootFolderName = rootFolder.getName();

	assert.assertEquals(expectedRootFolderId, actualRootFolderId, 'The expected root folder Id, does not mach the actual root folder Id!');
	assert.assertEquals(expectedRootFolderPath, actualRootFolderPath, 'The expected root folder path, does not mach the actual root folder path!');
	assert.assertEquals(expectedRootFolderName, actualRootFolderName, 'The expected root folder name, does not mach the actual root folder name!');
}

function testGetChildren() {
	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();
	var children = rootFolder.getChildren();

	assert.assertNotNull(children, 'The children is null!');
}

function testCreateFolder() {
	var expectedFolderName = TEST_FOLDER_NAME;
	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();
	var properties = {};
	properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_FOLDER,
	properties[cmis.NAME] = expectedFolderName;

	var newFolder = rootFolder.createFolder(properties);

	assert.assertNotNull(newFolder, 'The new folder is null!');
	assert.assertEquals(expectedFolderName, newFolder.getName(), 'The expected folder name does not match the actual folder name!');
}

function testDeleteFolder() {
	var expectedFolderName = TEST_FOLDER_NAME;
	var cmisSession = cmis.getSession();
	var rootFolder = cmisSession.getRootFolder();
	var properties = {};
	properties[cmis.OBJECT_TYPE_ID] = cmis.OBJECT_TYPE_FOLDER,
	properties[cmis.NAME] = expectedFolderName;

	var newFolder = rootFolder.createFolder(properties);
	newFolder.delete();

	var childern = rootFolder.getChildren();
	for (var i = 0 ; i < childern.length; i ++) {
		if (childern[i].getName() === TEST_FOLDER_NAME) {
			assert.fail('The folder was not deleted!');
		}
	}
}