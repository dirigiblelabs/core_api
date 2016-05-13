/* globals $ java */
/* eslint-env node, dirigible */

exports.getConfigurationService = function() {
	var internalConfiguration = $.getConfigurationStorage();
	return new ConfigurationService(internalConfiguration);
}

/**
 * Configuration Service object
 */
function ConfigurationService(internalConfiguration) {
	this.internalConfiguration = internalConfiguration;
	this.getInternalObject = configurationGetInternalObject;
	this.get = configurationGet;
	this.set = configurationSet;
	this.delete = configurationDelete;
	this.clear = configurationClear;
}

function configurationGetInternalObject() {
	return this.internalConfiguration;
}

function configurationGet(path) {
	return new java.lang.String(this.internalConfiguration.get(path));
}

function configurationSet(path, data) {
	this.internalConfiguration.put(path, new java.lang.String(data).getBytes());
}

function configurationDelete(path) {
	this.internalConfiguration.delete(path);
}

function configurationClear() {
	this.internalConfiguration.clear();
}
