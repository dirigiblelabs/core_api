/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([testPaging]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testPaging() {
	var datasource = database.getDatasource();
	var paging = datasource.getPaging();

	// only one of both below will return non-empty result - depends on the database dialect
	var pagingQuery = paging.genLimitAndOffset(100, 200);
	pagingQuery += paging.genTopAndStart(300, 400)

	assert.assertNotNull(pagingQuery, 'The paging query is null!');
}
