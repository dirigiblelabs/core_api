/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([testGetCmisSessionId, testGetCmisSessionName]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testGetCmisSessionId() {
	var cmisSession = cmis.getSession();
	var sessionId = cmisSession.getRepositoryInfo().getId();

	assert.assertNotNull(sessionId, 'The CMIS session Id is null!');
}

function testGetCmisSessionName() {
	var cmisSession = cmis.getSession();
	var sessionName = cmisSession.getRepositoryInfo().getName();

	assert.assertNotNull(sessionName, 'The CMIS session name is null!');
}