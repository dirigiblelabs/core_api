/*******************************************************************************
 * Copyright (c) 2015 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ java */
/* eslint-env node, dirigible */

exports.validate = function(uuid) {
	try {
		var uuidUtils = $.getUuidUtils();
		if (uuidUtils.fromString) {
			uuidUtils.fromString(uuid).toString();
		} else {
			// nashorn compatibility
			uuidUtils.class.static.fromString(uuid).toString();
		}
		return true;
	} catch(e) {
		console.error(e.message);
		return false;
	}


};

exports.randomUUID = function() {
	var uuidUtils = $.getUuidUtils();
	if (uuidUtils.randomUUID) {
		return uuidUtils.randomUUID().toString();
	} else {
		// nashorn
		return uuidUtils.class.static.randomUUID().toString();
	}
};
