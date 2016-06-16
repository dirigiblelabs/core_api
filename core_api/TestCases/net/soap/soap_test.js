/* eslint-env node, dirigible */

var soap = require("net/soap");
var response = require('net/http/response');

var message = soap.createMessage();
var part = message.getPart();
var envelope = part.getEnvelope();
envelope.addNamespaceDeclaration("products", "http://ecommerce.com");
var header = envelope.getHeader();
var headerName = envelope.createName("exchnage", "ex", "http://ecommerce.com/exchange");
header.addHeaderElement(headerName);
var body = envelope.getBody();
var productElement = body.addChildElement("name", "products");
productElement.addTextNode("Tomatoes");
var colorName = envelope.createName("color", "clr", "http://colors.com");
productElement.addAttribute(colorName, "red");

message.save();

response.println("Message: " + message.getText());

response.flush();
response.close();
