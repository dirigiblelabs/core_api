/* globals $ */
/* eslint-env node, dirigible */

exports.getDataSource = function() {
	var internalDataSource = $.getDatasource();
	return new DataSource(internalDataSource);
};

exports.getNamedDataSource = function(name) {
	var internalDataSource = $.getNamedDatasource(name);
	return new DataSource(internalDataSource);
};


/**
 * DataSource object
 */
function DataSource(internalDataSource) {
	this.internalDataSource = internalDataSource;
	this.getConnection = getConnection;
}

function getConnection() {
	var internalConnection = this.internalDataSource.getConnection();
	return new Connection(internalConnection);
}

/**
 * Connection object
 */
function Connection(internalConnection) {
	this.internalConnection = internalConnection;
	this.prepareStatement = prepareStatement;
	this.close = connectionClose;
	this.commit = connectionCommit;
	this.getAutoCommit = connectionGetAutoCommit;
	this.getCatalog = connectionGetCatalog;
	// getClientInfo
	// getMetaData
	this.getSchema = connectionGetSchema;
	this.getTransactionIsolation = connectionGetTransactionIsolation;
	this.isClosed = connectionIsClosed;
	this.isReadOnly = connectionIsReadOnly;
	this.isValid = connectionIsValid;
	// prepareCall
	this.rollback = connectionRollback;
	this.setAutoCommit = connectionSetAutoCommit;
	this.setCatalog = connectionSetCatalog;
	// setClientInfo
	this.setReadOnly = connectionSetReadOnly;
	this.setSchema = connectionSetSchema;
	this.setTransactionIsolation = connectionSetTransactionIsolation;
}

function prepareStatement(sql) {
	var internalStatement = this.internalConnection.prepareStatement(sql);
	return new Statement(internalStatement);
}

function connectionClose() {
	this.internalConnection.close();
}

function connectionCommit() {
	this.internalConnection.commit();
}

function connectionGetAutoCommit() {
	return this.internalConnection.getAutoCommit();
}

function connectionGetCatalog() {
	return this.internalConnection.getCatalog();
}

function connectionGetSchema() {
	return this.internalConnection.getSchema();
}

function connectionGetTransactionIsolation() {
	return this.internalConnection.getTransactionIsolation();
}

function connectionIsClosed() {
	return this.internalConnection.isClosed();
}

function connectionIsReadOnly() {
	return this.internalConnection.isReadOnly();
}

function connectionIsValid() {
	return this.internalConnection.isValid();
}

function connectionRollback() {
	this.internalConnection.rollback();
}

function connectionSetAutoCommit(autoCommit) {
	this.internalConnection.setAutoCommit(autoCommit);
}

function connectionSetCatalog(catalog) {
	this.internalConnection.setCatalog(catalog);
}

function connectionSetReadOnly(readOnly) {
	this.internalConnection.setReadOnly(readOnly);
}

function connectionSetSchema(schema) {
	this.internalConnection.setSchema(schema);
}

function connectionSetTransactionIsolation(transactionIsolation) {
	this.internalConnection.setTransactionIsolation(transactionIsolation);
}


/**
 * Statement object
 */
function Statement(internalStatement) {
	this.internalStatement = internalStatement;
	this.setInt = statementSetInt;
	this.setString = statementSetString;
	this.executeQuery = statementExecuteQuery;
	this.close = statementClose;
}

function statementSetInt(index, value) {
	this.internalStatement.setInt(index, value);
}

function statementSetString(index, value) {
	this.internalStatement.setString(index, value);
}

function statementExecuteQuery() {
	var internalResultSet = this.internalStatement.executeQuery();
	return new ResultSet(internalResultSet);
}

function statementClose() {
	this.internalStatement.close();
}


function ResultSet(internalResultSet) {
	this.internalResultSet = internalResultSet;
	this.next = resultSetNext;
	this.getInt = resultSetGetInt;
	this.getString = resultSetGetString;
	this.close = resultSetClose;
}

function resultSetNext() {
	return this.internalResultSet.next();
}

function resultSetGetInt(identifier) {
	return this.internalResultSet.getInt(identifier);
}

function resultSetGetString(identifier) {
	return this.internalResultSet.getString(identifier);
}

function resultSetClose() {
	this.internalResultSet.close();
}

