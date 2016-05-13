/* globals $ */
/* eslint-env node, dirigible */

var config = require('api/admin/config');
var response = require('api/http/response');

var ConfigurationService = config.getConfigurationService();

var properties = {
		"property1": "value1",
		"property2": "value2"
	}

ConfigurationService.set("/path/to/property", "single_value1");
ConfigurationService.set("/path/to/properties", JSON.stringify(properties));

response.println(ConfigurationService.get("/path/to/property"));
response.println(ConfigurationService.get("/path/to/properties"));

ConfigurationService.delete("/path/to/property");
ConfigurationService.delete("/path/to/properties");

response.println(ConfigurationService.get("/path/to/property"));
response.println(ConfigurationService.get("/path/to/properties"));

response.flush();
response.close();
