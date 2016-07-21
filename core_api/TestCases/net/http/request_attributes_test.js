/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

request.setAttribute("my_attribute", "my_value");
var myValue = request.getAttribute("my_attribute");
var attributeNames = request.getAttributeNames();

response.println("[Attribute] my_attribute: " + myValue);
response.println("[Attribute Names]: " + attributeNames);
response.flush();
response.close();
