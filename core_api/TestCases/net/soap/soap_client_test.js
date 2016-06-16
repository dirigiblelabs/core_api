/* eslint-env node, dirigible */

var soap = require("net/soap");
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");

var requestMessage = soap.createMessage();
var part = requestMessage.getPart();
var envelope = part.getEnvelope();
envelope.addNamespaceDeclaration("ws", "http://ws.cdyne.com/");
var body = envelope.getBody();
var resolveIPElement = body.addChildElement("ResolveIP", "ws");
var ipAddressElement = resolveIPElement.addChildElement("ipAddress", "ws");
ipAddressElement.addTextNode("213.239.203.158");
var licenseKeyElement = resolveIPElement.addChildElement("licenseKey", "ws");
licenseKeyElement.addTextNode("");

var mimeHeaders = requestMessage.getMimeHeaders();
mimeHeaders.addHeader("SOAPAction", "http://ws.cdyne.com/ResolveIP");

requestMessage.save();
response.println("Request: " + requestMessage.getText());

var responseMessage = soap.call(requestMessage, "http://ws.cdyne.com/ip2geo/ip2geo.asmx");

response.println("Response: " + responseMessage.getText());

response.println("------");

var responsePart = responseMessage.getPart();
var responseEnvelope = responsePart.getEnvelope();
var responseBody = responseEnvelope.getBody();
var childElements = responseBody.getChildElements();
printElements(childElements);

response.flush();
response.close();

function printElements(childElements) {
	childElements.forEach(function(element) {
		if (element.isSOAPElement()) {
			var name = element.getElementName();
			response.print(name.getLocalName());
			response.print(": ");
			response.println(element.getValue());
			printElements(element.getChildElements());
		}
	});
}
