/* globals $ */
/* eslint-env node, dirigible */

var passwords = require('service/passwords');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_PASSWORD_NAME = 'testPassword';
const TEST_PASSWORD_VALUE = 'TestPassword1';

executeTests();

function executeTests() {
	tests.after(cleanUp);
	var testResult = tests.execute([
		testGetPassword,
		testSetPassword,
		testDeletePassword
	]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function cleanUp() {
	passwords.deletePassword(TEST_PASSWORD_NAME);
}

function testGetPassword() {
	var password = passwords.getPassword(TEST_PASSWORD_NAME);
	assert.assertNull(password);
}

function testSetPassword() {
	passwords.setPassword(TEST_PASSWORD_NAME, TEST_PASSWORD_VALUE);
	var actualPassword = passwords.getPassword(TEST_PASSWORD_NAME);
	assert.assertNotNull(actualPassword, 'After set, the password is null!');
	assert.assertEquals(TEST_PASSWORD_VALUE, actualPassword);
}

function testDeletePassword() {
	passwords.setPassword(TEST_PASSWORD_NAME, TEST_PASSWORD_VALUE);
	passwords.deletePassword(TEST_PASSWORD_NAME);
	var actualPassword = passwords.getPassword(TEST_PASSWORD_NAME);
	assert.assertNull(actualPassword, 'After delete, the password is not null!');
}
