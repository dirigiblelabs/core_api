/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

const TEST_SEQUENCE_NAME = 'testSequence';

executeTests();

function executeTests() {
	tests.before(setUp);
	var testResult = tests.execute([testGetSequence, testCreateSequence, testSequenceNext]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function setUp() {
	var datasource = database.getDatasource();
	var sequence = datasource.getSequence(TEST_SEQUENCE_NAME);
	if (sequence.exists()) {
		sequence.drop();
	}
}

function testGetSequence() {
	var datasource = database.getDatasource();
	var sequence = datasource.getSequence(TEST_SEQUENCE_NAME);

	assert.assertFalse(sequence.exists(), 'The sequence should not exists!');
}

function testCreateSequence() {
	var datasource = database.getDatasource();
	var sequence = datasource.getSequence(TEST_SEQUENCE_NAME);

	sequence.create(100);
	assert.assertTrue(sequence.exists(), 'The sequence does not exists!');
}

function testSequenceNext() {
	var datasource = database.getDatasource();
	var sequence = datasource.getSequence(TEST_SEQUENCE_NAME);

	sequence.create(100);
	assert.assertTrue(sequence.next() > 100, 'The sequence next value is not greater than the initial sequence value!');
}