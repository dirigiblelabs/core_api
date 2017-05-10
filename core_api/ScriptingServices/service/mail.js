/*******************************************************************************
 * Copyright (c) 2015 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ */
/* eslint-env node, dirigible */

exports.send = function(from, to, subject, content, subType) {
	var sent = $.getMailService().sendMail(from, to, subject, content, subType);
	if (sent !== null && sent !== undefined && sent !== '') {
		throw new Error(sent);
	}
};
