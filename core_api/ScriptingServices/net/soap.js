/*******************************************************************************
 * Copyright (c) 2016 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ javax */
/* eslint-env node, dirigible */

var streams = require("io/streams");

exports.createMessage = function() {
	var internalFactory = javax.xml.soap.MessageFactory.newInstance();
	var internalMessage = internalFactory.createMessage();
	return new Message(internalMessage);
};

/**
 * SOAP Message
 */
function Message(internalMessage) {
	this.internalMessage = internalMessage;
	this.getInternalObject = messageGetInternalObject;
	this.getPart = messageGetPart;
	this.update = messageUpdate;
	this.getText = messageGetText;
}

function messageGetInternalObject() {
	return this.internalMessage;
}

function messageGetPart() {
	var internalPart = this.internalMessage.getSOAPPart();
	return new Part(internalPart);
}

function messageUpdate() {
	this.internalMessage.saveChanges();
}

function messageGetText() {
	var outputStream = streams.createByteArrayOutputStream();
	this.internalMessage.writeTo(outputStream.getInternalObject());
	return outputStream.getText();
}

/**
 * SOAP Part
 */
function Part(internalPart) {
	this.internalPart = internalPart;
	this.getInternalObject = partGetInternalObject;
	this.getEnvelope = partGetEnvelope;
}

function partGetInternalObject() {
	return this.internalPart;
}

function partGetEnvelope() {
	var internalEnvelope = this.internalPart.getEnvelope();
	return new Envelope(internalEnvelope);
}

/**
 * SOAP Envelope
 */
function Envelope(internalEnvelope) {
	this.internalEnvelope = internalEnvelope;
	this.getInternalObject = envelopeGetInternalObject;
	this.addNamespaceDeclaration = envelopeAddNamespaceDeclaration;
	this.getBody = envelopeGetBody;
	this.createName = envelopeCreateName;
}

function envelopeGetInternalObject() {
	return this.internalEnvelope;
}

function envelopeAddNamespaceDeclaration(prefix, uri) {
	this.internalEnvelope.addNamespaceDeclaration(prefix, uri);
}

function envelopeGetBody() {
	var internalBody = this.internalEnvelope.getBody();
	return new Body(internalBody);
}

function envelopeCreateName(localName, prefix, uri) {
	var internalName = this.internalEnvelope.createName(localName, prefix, uri);
	return new Name(internalName);
}

/**
 * SOAP Body
 */
function Body(internalBody) {
	this.internalBody = internalBody;
	this.getInternalObject = bodyGetInternalObject;
	this.addChildElement = bodyAddChildElement;
}

function bodyGetInternalObject() {
	return this.internalBody;
}

function bodyAddChildElement(localName, prefix) {
	var internalElement = this.internalBody.addChildElement(localName, prefix);
	return new Element(internalElement);
}

/**
 * SOAP Name
 */
function Name(internalName) {
	this.internalName = internalName;
	this.getInternalObject = nameGetInternalObject;
	this.getLocalName = nameGetLocalName;
	this.getPrefix = nameGetPrefix;
	this.getQualifiedName = nameGetQualifiedName;
	this.getURI = nameGetURI;
}

function nameGetInternalObject() {
	return this.internalName;
}

function nameGetLocalName() {
	return this.internalName.getLocalName();
}

function nameGetPrefix() {
	return this.internalName.getPrefix();
}

function nameGetQualifiedName() {
	return this.internalName.getQualifiedName();
}

function nameGetURI() {
	return this.internalName.getURI();
}

/**
 * SOAP Element
 */
function Element(internalElement) {
	this.internalElement = internalElement;
	this.getInternalObject = elementGetInternalObject;
	this.addChildElement = elementAddChildElement;
	this.addTextNode = elementAddTextNode;
	this.addAttribute = elementAddAttribute;
}

function elementGetInternalObject() {
	return this.internalElement;
}

function elementAddChildElement(localName, prefix) {
	var internalElement = this.internalElement.addChildElement(localName, prefix);
	return new Element(internalElement);
}

function elementAddTextNode(text) {
	var internalElement = this.internalElement.addTextNode(text);
	return new Element(internalElement);
}

function elementAddAttribute(name, value) {
//	var qname = new javax.xml.namespace.QName(namespace, localName);
	var internalElement = this.internalElement.addAttribute(name.getInternalObject(), value);
	return new Element(internalElement);
}



exports.trustAll = function() {
	// TODO
};
