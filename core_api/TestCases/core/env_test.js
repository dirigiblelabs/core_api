/* globals $ */
/* eslint-env node, dirigible */

var env = require('core/env');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([
		testEnvGet,
		testEnvGetOperatingSystemName,
		testGetOperatingSystemArchitecture,
		testGetOperatingSystemVersion,
		testGetFileSeparator,
		testGetPathSeparator,
		testGetLineSeparator,
		testGetUserDirectory,
		testGetUserHome,
		testGetUserName
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testEnvGet() {
	var expectedEnv = env.get("os.name");
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testEnvGetOperatingSystemName() {
	var expectedEnv = env.getOperatingSystemName();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetOperatingSystemArchitecture() {
	var expectedEnv = env.getOperatingSystemArchitecture();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetOperatingSystemVersion() {
	var expectedEnv = env.getOperatingSystemVersion();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetFileSeparator() {
	var expectedEnv = env.getFileSeparator();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetPathSeparator() {
	var expectedEnv = env.getPathSeparator();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetLineSeparator() {
	var expectedEnv = env.getLineSeparator();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetUserDirectory() {
	var expectedEnv = env.getUserDirectory();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetUserHome() {
	var expectedEnv = env.getUserHome();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}

function testGetUserName() {
	var expectedEnv = env.getUserName();
	assert.assertNotNull(expectedEnv, 'The expected env is null!');
}