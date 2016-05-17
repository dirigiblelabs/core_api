/* globals $ */
/* eslint-env node, dirigible */

var xml = require('api/utils/xml');
var response = require('api/http/response');

var jsonInput = {
	'firstName': 'John',
	'lastName': 'Doe',
	'bio': {
		'age': 24,
		'sex': 'male'
	}
};

var xmlInput = 
	"<firstName>John</firstName>" +
	"<lastName>Doe</lastName>" + 
	"<bio>" + 
	"<age>24</age>" +
	"<sex>male</sex>" +
	"</bio>";

response.println(xml.fromJson(jsonInput));
response.println(xml.toJson(xmlInput));

response.flush();
response.close();
