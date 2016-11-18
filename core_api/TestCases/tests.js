/* globals $ */
/* eslint-env node, dirigible */

var itests = require('service/itests');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = itests.execute(getTests());

	response.setContentType('application/javascript');
	response.setStatus(itests.getHttpStatus(testResult));
	response.println(itests.getText(testResult));
	response.flush();
	response.close();
}

function getTests() {
	var tests = [];
	tests = tests.concat(getCoreTests());
	tests = tests.concat(getDbTests());
	tests = tests.concat(getDocTests());
	tests = tests.concat(getIoTests());
	tests = tests.concat(getServiceTests());
	tests = tests.concat(getUtilsTests());
	return tests;
}

function getCoreTests() {
	return [
		'/test/core/config_test.js',
		'/test/core/context_test.js',
		'/test/core/env_test.js',
		'/test/core/extensions_test.js',
		'/test/core/globals_test.js'
	];
}

function getDbTests() {
	return [
		'/test/db/database_paging_test.js',
		'/test/db/database_sequence_test.js',
		'/test/db/database_test.js',
	];
}

function getDocTests() {
	return [
		'/test/doc/cmis_document_test.js',
		'/test/doc/cmis_folder_test.js',
		'/test/doc/cmis_session_test.js'
	];
}

function getIoTests() {
	return [
		'/test/io/file_attrs_test.js',
		'/test/io/file_copy_test.js',
		'/test/io/file_create_test.js',
		'/test/io/file_list_test.js',
		'/test/io/file_read_write_test.js',
		'/test/io/file_test.js',
		'/test/io/stream_convert_test.js',
		'/test/io/stream_read_write_test.js'
	];
}

function getServiceTests() {
	return [
		'/test/service/passwords_test.js'
	];
}

function getUtilsTests() {
	return [
		'/test/utils/base64_test.js',
		'/test/utils/digest_test.js',
		'/test/utils/error_test.js',
		'/test/utils/hex_test.js',
		'/test/utils/uuid_test.js',
		'/test/utils/xml_test.js',
		'/test/utils/xss_test.js'
	];
}
