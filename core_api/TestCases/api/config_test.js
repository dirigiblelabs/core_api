/* globals $ */
/* eslint-env node, dirigible */

var config = require('api/config');
var response = require('api/http/response');

var properties = {
		"property1": "value1",
		"property2": "value2"
	}

config.set("/path/to/property", "key1", "value1");
config.setJson("/path/to/properties", JSON.stringify(properties));

response.println(config.get("/path/to/property", "key1"));
var result = JSON.parse(config.getJson("/path/to/properties"));
response.println(result.property2);

config.delete("/path/to/property");
config.delete("/path/to/properties");

response.println(config.get("/path/to/property"));
response.println(config.get("/path/to/properties"));

response.flush();
response.close();
