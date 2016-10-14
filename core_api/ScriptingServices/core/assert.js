/*******************************************************************************
 * Copyright (c) 2016 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ java */
/* eslint-env node, dirigible */

var errorUtils = require('utils/error');

exports.assertTrue = function(condition, message) {
	if (!condition) {
		console.error(message);
		throw errorUtils.createError(message);
	}
};

exports.assertFalse = function(condition, message) {
	if (condition) {
		console.error(message);
		throw errorUtils.createError(message);
	}
};

exports.assertEquals = function(o1, o2, message) {
	if (JSON.stringify(o1) !== JSON.stringify(o2) ) {
		console.error(message);
		throw errorUtils.createError(message);
	}
};

exports.assertNull = function(o, message) {
	if (o !== undefined && o !== null) {
		console.error(message);
		throw errorUtils.createError(message);
	}
};

exports.assertNotNull = function(o, message) {
	if (o === undefined || o === null) {
		console.error(message);
		throw errorUtils.createError(message);
	}
};

exports.fail = function(message) {
	console.error(message);
	throw errorUtils.createError(message);
};
