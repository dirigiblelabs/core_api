/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');

var assert = require('core/assert');
var tests = require('service/tests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = tests.execute([testGetDatasource, testGetConnection, testExecuteQuery]);

	response.setStatus(tests.getHttpStatus(testResult));
	response.println(tests.getText(testResult));
	response.flush();
	response.close();
}

function testGetDatasource() {
	var datasource = database.getDatasource();
	//var datasource = db.getNamedDatasource("name-of-the-datasource");
	assert.assertNotNull(datasource, 'Tha datasource is null!');
}

function testGetConnection() {
	var datasource = database.getDatasource();
	var connection = datasource.getConnection();
	assert.assertNotNull(connection, 'The database connection is null!');
}

function testExecuteQuery() {
	var datasource = database.getDatasource();
	var connection = datasource.getConnection();
	try {
	    var statement = connection.prepareStatement("select * from DGB_FILES where FILE_PATH like ?");
	    statement.setString(1, "%");
	    var resultSet = statement.executeQuery();
	    while (resultSet.next()) {
	        assert.assertNotNull(resultSet.getString("FILE_PATH"), 'The FILE_PATH is null!');
	    }
	    resultSet.close();
	    statement.close();
	} finally {
	    connection.close();
	}
}