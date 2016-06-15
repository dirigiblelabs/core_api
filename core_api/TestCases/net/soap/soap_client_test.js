/* eslint-env node, dirigible */

var soap = require("net/soap");
var response = require('net/http/response');

var message = soap.createMessage();
var part = message.getPart();
var envelope = part.getEnvelope();
envelope.addNamespaceDeclaration("products", "http://ecommerce.com");
var body = envelope.getBody();
var productElement = body.addChildElement("name", "products");
productElement.addTextNode("Tomatoes");
var colorName = envelope.createName("color", "clr", "http://colors.com");
productElement.addAttribute(colorName, "red");

message.saveChanges();

response.println(message.getText());

response.flush();
response.close();
