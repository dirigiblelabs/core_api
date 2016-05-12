/* globals $ java */
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
	this.getInternalObject = datasourceGetInternalObject;
	this.getConnection = datasourceGetConnection;
}

function datasourceGetInternalObject() {
	return this.internalDataSource;
}

function datasourceGetConnection() {
	var internalConnection = this.internalDataSource.getConnection();
	return new Connection(internalConnection);
}

/**
 * Connection object
 */
function Connection(internalConnection) {
	this.internalConnection = internalConnection;
	this.getInternalObject = connectionGetInternalObject;
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

function connectionGetInternalObject() {
	return this.internalConnection;
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
	this.getInternalObject = statementGetInternalObject;
	this.close = statementClose;
	
	this.execute = statementExecute;
	this.executeQuery = statementExecuteQuery;
	this.executeUpdate = statementExecuteUpdate;
	// getMetaData
	// setBigDecimal
	// setBlob
	this.setBoolean = statementSetBoolean;
	// setByte
	// setBytes
	// setClob
	this.setDate = statementSetDate;
	this.setDouble = statementSetDouble;
	this.setFloat = statementSetFloat;
	this.setInt = statementSetInt;
	this.setLong = statementSetLong;
	this.setShort = statementSetShort;
	this.setString = statementSetString;
	this.setTime = statementSetTime;
	this.setTimestamp = statementSetTimestamp;
}

function statementGetInternalObject() {
	return this.internalStatement;
}

function statementClose() {
	this.internalStatement.close();
}

function statementExecute() {
	return this.internalStatement.execute();
}

function statementExecuteQuery() {
	var internalResultSet = this.internalStatement.executeQuery();
	return new ResultSet(internalResultSet);
}

function statementExecuteUpdate() {
	return this.internalStatement.executeUpdate();
}

function statementSetBoolean(index, value) {
	this.internalStatement.setBoolean(index, value);
}

function statementSetDate(index, value) {
	this.internalStatement.setDate(index, new java.util.Date(value.getTime()));
}

function statementSetDouble(index, value) {
	this.internalStatement.setDouble(index, value);
}

function statementSetFloat(index, value) {
	this.internalStatement.setFloat(index, value);
}

function statementSetInt(index, value) {
	this.internalStatement.setInt(index, value);
}

function statementSetLong(index, value) {
	this.internalStatement.setLong(index, value);
}

function statementSetShort(index, value) {
	this.internalStatement.setShort(index, value);
}

function statementSetString(index, value) {
	this.internalStatement.setString(index, value);
}

function statementSetTime(index, value) {
	this.internalStatement.setTime(index, new java.util.Time(value.getTime()));
}

function statementSetTimestamp(index, value) {
	this.internalStatement.setTimestamp(index, new java.util.Timestamp(value.getTime()));
}

/**
 * ResultSet object
 */
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

