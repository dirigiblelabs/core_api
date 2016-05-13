/* globals $ */
/* eslint-env node, dirigible */

var config = require('api/config');
var response = require('api/http/response');

var properties = {
		"property1": "value1",
		"property2": "value2"
	}

config.set("/path/to/property", "single_value1");
config.set("/path/to/properties", JSON.stringify(properties));

response.println(config.get("/path/to/property"));
response.println(config.get("/path/to/properties"));

config.delete("/path/to/property");
config.delete("/path/to/properties");

response.println(config.get("/path/to/property"));
response.println(config.get("/path/to/properties"));

response.flush();
response.close();
