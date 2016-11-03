/*******************************************************************************
 * Copyright (c) 2015 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ java javax engine */
/* eslint-env node, dirigible */

var streams = require("io/streams");

/**
 * Read the stream content as a byte array
 */
exports.createZipInputStream = function(inputStream) {
	var internalZipInputStream = new java.util.zip.ZipInputStream(inputStream.getInternalObject());
	return new ZipInputStream(internalZipInputStream);
};

/**
 * ZipInputStream object
 */
function ZipInputStream(internalZipInputStream) {
	this.internalZipInputStream = internalZipInputStream;

	this.getInternalObject = function() {
		return this.internalZipInputStream;
	};

	this.getNextEntry = function() {
	    var internalZipEntry = this.internalZipInputStream.getNextEntry();
		return new ZipEntry(internalZipEntry, this.internalZipInputStream);
	};
	
	this.close = function() {
		return this.internalZipInputStream.close();
	};

}

/**
 * ZipEntry object
 */
function ZipEntry(internalZipEntry, internalZipInputStream) {
	this.internalZipEntry = internalZipEntry;
	this.internalZipInputStream = internalZipInputStream;

	this.getInternalObject = function() {
		return this.internalZipEntry;
	};

	this.getName = function() {
		return this.internalZipEntry.getName();
	};
	
	this.getSize = function() {
		return this.internalZipEntry.getSize();
	};
	
	this.getCompressedSize = function() {
		return this.internalZipEntry.getCompressedSize();
	};
	
	this.getTime = function() {
		return this.internalZipEntry.getTime();
	};
	
	this.getCrc = function() {
		return this.internalZipEntry.getCrc();
	};
	
	this.getComment = function() {
		return this.internalZipEntry.getComment();
	};
	
	this.isDirectory = function() {
		return this.internalZipEntry.isDirectory();
	};
	
	this.close = function() {
		return this.internalZipEntry.close();
	};
	
	this.isValid = function() {
		return this.internalZipEntry !== null;
	};
	
	this.readData = function() {
		var internalBytesBuffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 2048);
		var bytes = null;
		var output = null;
		try {
			output = new java.io.ByteArrayOutputStream();
			var len = 0;
			while ((len = this.internalZipInputStream.read(internalBytesBuffer)) > 0) {
				output.write(internalBytesBuffer, 0, len);
			}
			bytes = streams.toJavaScriptBytes(output.toByteArray());
		} finally {
			// we must always close the output file
			if (output !== null) {
				output.close();
			}
		}
		return bytes;
	};
}


