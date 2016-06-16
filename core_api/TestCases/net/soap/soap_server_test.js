/* globals $ */
/* eslint-env node, dirigible */

var soap = require("net/soap");
var request = require('net/http/request');
var response = require('net/http/response');

// Parse SOAP request
var message = soap.parseRequest();

// More fine grained
//var input = request.getInput();
//var mimeHeaders = soap.createMimeHeaders();
//var message = soap.parseMessage(mimeHeaders, input);

var requestPart = message.getPart();
var requestEnvelope = requestPart.getEnvelope();
var requestBody = requestEnvelope.getBody();
var childElements = requestBody.getChildElements();
printElements(childElements);

response.println(message.getText());

response.flush();
response.close();

function printElements(childElements) {
	childElements.forEach(function(element) {
		if (element.isSOAPElement()) {
			var name = element.getElementName();
			console.log(name.getLocalName() + ": " + element.getValue());
			printElements(element.getChildElements());
		}
	});
}