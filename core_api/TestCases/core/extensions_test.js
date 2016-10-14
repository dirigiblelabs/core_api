/* globals $ */
/* eslint-env node, dirigible */

var extensions = require('core/extensions');
var assert = require('core/assert');
var response = require('net/http/response');

executeTests();

function executeTests() {
	var testResult = {
		'status': 'OK',
	};

	try {
		testAPIExists();
		testGetExtensionPoint();
		testCreateExtensionPoint();
		testUpdateExtensionPoint()
		testGetExtension();
		testCreateExtension();
		testUpdateExtension();
	} catch (e) {
		testResult.status = 'Failed';
		testResult.errorInfo = e;
	}

	response.setStatus(getTestsResultResponseStatus(testResult));
	response.println(getTestsResultResponseText(testResult));
	response.flush();
	response.close();
}

function getTestsResultResponseStatus(testResult) {
	if (isValidJSON(testResult) && testResult.status === 'OK') {
		return response.OK;
	}
	return response.EXPECTATION_FAILED;
}

function getTestsResultResponseText(testResult) {
	if (isValidJSON(testResult)) {
		return JSON.stringify(testResult, null, 2);
	}
	return testResult;
}

function isValidJSON(data) {
	try {
		JSON.stringify(data);
		return true;
	} catch(e) {
		return false;
	}
}
function testAPIExists() {
	assert.assertNotNull(extensions, 'The extensions API is null!');
}

function testGetExtensionPoint() {
	var expectedLocation = '/registry/routes';
	var extensionPointDefinition = extensions.getExtensionPoint(expectedLocation);
	assert.assertNotNull(extensionPointDefinition, 'The expected extension point is null!');
	assert.assertEquals(extensionPointDefinition.getLocation(), expectedLocation, 'The expected extension point location doesn\'t match the actual location!');
}

function testCreateExtensionPoint() {
	var expectedLocation = '/test/create/extensionPoint';
	var expectedDescription = 'Test Description';

	extensions.createExtensionPoint(expectedLocation, expectedDescription);

	var actualExtensionPoint = extensions.getExtensionPoint(expectedLocation);
	assert.assertNotNull(actualExtensionPoint, 'The actual extension point is null!');
	assert.assertEquals(expectedLocation, actualExtensionPoint.getLocation(), 'The expected extension point location doesn\'t match the actual location!');
	assert.assertEquals(expectedDescription, actualExtensionPoint.getDescription(), 'The expected extension point description doesn\'t match the actual location!');

	extensions.removeExtensionPoint(expectedLocation);
}

function testUpdateExtensionPoint() {
	var expectedLocation = '/test/update/extensionPoint';
	var expectedDescription = 'Updated Test Description';

	extensions.createExtensionPoint(expectedLocation, 'Test 1234');
	extensions.updateExtensionPoint(expectedLocation, expectedDescription);

	var actualExtensionPoint = extensions.getExtensionPoint(expectedLocation);
	assert.assertNotNull(actualExtensionPoint, 'The actual extension point is null!');
	assert.assertEquals(expectedLocation, actualExtensionPoint.getLocation(), 'The expected extension point location doesn\'t match the actual location!');
	assert.assertEquals(expectedDescription, actualExtensionPoint.getDescription(), 'The expected extension point description doesn\'t match the actual location!');

	extensions.removeExtensionPoint(expectedLocation);
}

function testGetExtension() {
	var expectedLocation = '/registry/extensions/routes/develop';
	var expetedExtensionPoint = '/registry/extension_points/routes';

	var extensionDefinition = extensions.getExtension(expectedLocation, expetedExtensionPoint);

	assert.assertNotNull(extensionDefinition, 'The expected extension is null!');
	assert.assertEquals(expectedLocation, extensionDefinition.getLocation(), 'The expected extension location doesn\'t match the actual location!');
	assert.assertEquals(expetedExtensionPoint, extensionDefinition.getExtensionPoint(), 'The expected extension location doesn\'t match the actual location!');
}

function testCreateExtension() {
	var expectedLocation = '/test/create/extension';
	var expectedExtensionPoint = '/test/extension/point';
	var expectedDescription = 'Test Description';

	extensions.createExtension(expectedLocation, expectedExtensionPoint, expectedDescription);

	var actualExtension = extensions.getExtension(expectedLocation, expectedExtensionPoint);
	assert.assertNotNull(actualExtension, 'The actual extension is null!');
	assert.assertEquals(expectedLocation, actualExtension.getLocation(), 'The expected extension location doesn\'t match the actual location!');
	assert.assertEquals(expectedExtensionPoint, actualExtension.getExtensionPoint(), 'The expected extension extension point doesn\'t match the actual location!');
	assert.assertEquals(expectedDescription, actualExtension.getDescription(), 'The expected extension description doesn\'t match the actual location!');

	extensions.removeExtension(expectedLocation, expectedExtensionPoint);
}

function testUpdateExtension() {
	var expectedLocation = '/test/update/extensionPoint';
	var expectedExtensionPoint = '/test/extension/point';
	var expectedDescription = 'Updated Test Description';

	extensions.removeExtension(expectedLocation, expectedExtensionPoint);
	extensions.createExtension(expectedLocation, expectedExtensionPoint, 'Test 1234');
	extensions.updateExtension(expectedLocation, expectedExtensionPoint, expectedDescription);

	var actualExtension = extensions.getExtension(expectedLocation, expectedExtensionPoint);
	assert.assertNotNull(actualExtension, 'The actual extension point is null!');
	assert.assertEquals(expectedLocation, actualExtension.getLocation(), 'The expected extension location doesn\'t match the actual location!');
	assert.assertEquals(expectedExtensionPoint, actualExtension.getExtensionPoint(), 'The expected extension extension point doesn\'t match the actual location!');
	assert.assertEquals(expectedDescription, actualExtension.getDescription(), 'The expected extension description doesn\'t match the actual location!');

	extensions.removeExtension(expectedLocation, expectedExtensionPoint);
}
