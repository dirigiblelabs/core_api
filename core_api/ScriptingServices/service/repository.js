/*******************************************************************************
 * Copyright (c) 2015 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ java org */
/* eslint-env node, dirigible */

var streams = require("io/streams");

/**
 * Create a collection by the given path e.g. /myRoot/myCollection
 */
exports.createCollection = function(path) {
	$.getRepository().createCollection(path);
};

/**
 * Create a resource by the given path e.g. /myRoot/myCollection/myResource.txt,
 * content (a javascript bytes array object), isBinary - a flag indicating the type of the content and
 * the exact contentType following the corresponding RFC
 */
exports.createResource = function(path, content, isBinary, contentType) {
	$.getRepository().createResource(path, streams.toJavaBytes(content), isBinary ? isBinary : false, contentType ? contentType : "plain/text");
};

/**
 * Create a text resource by the given path e.g. /myRoot/myCollection/myResource and text.
 * Optionally you can provide the exact contentType of the provided text
 */
exports.createTextResource = function(path, text, contentType) {
    var content = new java.lang.String(text).getBytes();
	$.getRepository().createResource(path, content, false, contentType ? contentType : "plain/text");
};

/**
 * Get a Collection by the given path e.g. /myRoot/myCollection
 */
exports.getCollection = function(path) {
	var internalCollection = $.getRepository().getCollection(path);
	return new Collection(internalCollection);
};

/**
 * Gets a Resource by the given path e.g. /myRoot/myCollection/myResource.txt
 */
exports.getResource = function(path) {
	var internalResource = $.getRepository().getResource(path);
	return new Resource(internalResource);
};

/**
 * Gets the root Collection
 */
exports.getRoot = function(path) {
	var internalCollection = $.getRepository().getRoot();
	return new Collection(internalCollection);
};

/**
 * Check the existence of a Collection by the given path e.g. /myRoot/myCollection
 */
exports.hasCollection = function(path) {
	return $.getRepository().hasCollection(path);
};

/**
 * Check the existence of a Resource by the given path e.g. /myRoot/myCollection/myResource.txt
 */
exports.hasResource = function(path) {
	return $.getRepository().hasResource(path);
};

/**Removes a Collection by the given path e.g. /myRoot/myCollection
 */
exports.removeCollection = function(path) {
	return $.getRepository().removeCollection(path);
};

/**
 * Remove a Resource by the given path e.g. /myRoot/myCollection/myResource.txt
 */
exports.removeResource = function(path) {
	return $.getRepository().removeResource(path);
};

/**
 * Collection object
 */
function Collection(internalCollection) {
	this.internalCollection = internalCollection;
	this.getInternalObject = collectionGetInternalObject;
	this.create = collectionCreate;
}

function collectionGetInternalObject() {
	return this.internalCollection;
}

function collectionCreate() {
	this.internalCollection.create();
}


/**
 * Resource object
 */
function Resource(internalResource) {
	this.internalResource = internalResource;
	this.getInternalObject = resourceGetInternalObject;
	this.create = resourceCreate;
}

function resourceGetInternalObject() {
	return this.internalResource;
}

function resourceCreate() {
	this.internalResource.create();
}
