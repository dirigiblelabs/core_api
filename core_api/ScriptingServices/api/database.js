/* globals $ */
/* eslint-env node, dirigible */

exports.getDataSource = function() {
	var javaDataSource = $.getDatasource();
	return new DataSource(javaDataSource);
};

exports.getNamedDataSource = function(name) {
	var javaDataSource = $.getNamedDatasource(name);
	return new DataSource(javaDataSource);
};


function DataSource(javaDataSource) {
	this.javaDataSource = javaDataSource;
	this.getConnection = getConnection;
}

function getConnection() {
	var javaConnection = this.javaDataSource.getConnection();
	return new Connection(javaConnection);
}

function Connection(javaConnection) {
	this.javaConnection = javaConnection;
	this.prepareStatement = prepareStatement;
	this.close = connectionClose;
}

function prepareStatement(sql) {
	var javaStatement = this.javaConnection.prepareStatement(sql);
	return new Statement(javaStatement);
}

function connectionClose() {
	this.javaConnection.close();
}

function Statement(javaStatement) {
	this.javaStatement = javaStatement;
	this.setInt = statementSetInt;
	this.setString = statementSetString;
	this.executeQuery = statementExecuteQuery;
	this.close = statementClose;
}

function statementSetInt(index, value) {
	this.javaStatement.setInt(index, value);
}

function statementSetString(index, value) {
	this.javaStatement.setString(index, value);
}

function statementExecuteQuery() {
	var javaResultSet = this.javaStatement.executeQuery();
	return new ResultSet(javaResultSet);
}

function statementClose() {
	this.javaStatement.close();
}


function ResultSet(javaResultSet) {
	this.javaResultSet = javaResultSet;
	this.next = resultSetNext;
	this.getInt = resultSetGetInt;
	this.getString = resultSetGetString;
	this.close = resultSetClose;
}

function resultSetNext() {
	return this.javaResultSet.next();
}

function resultSetGetInt(identifier) {
	return this.javaResultSet.getInt(identifier);
}

function resultSetGetString(identifier) {
	return this.javaResultSet.getString(identifier);
}

function resultSetClose() {
	this.javaResultSet.close();
}

