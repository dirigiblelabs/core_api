/*******************************************************************************
 * Copyright (c) 2016 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 *******************************************************************************/

/* globals $ java org */
/* eslint-env node, dirigible */

exports.getWorker = function(type) {
	var internalWorker = $.getGenerationService().getGenerationWorker(type, $.getRequest());
	return new Worker(internalWorker);
};

/**
 * Worker object
 */
function Worker(internalWorker) {
	this.internalWorker = internalWorker;
	this.getInternalObject = workerGetInternalObject;
	this.generate = workerGenerate;
	this.getTemplates = workerGetTemplates;
}

function workerGetInternalObject() {
	return this.internalWorker;
}

function workerGenerate(parameters) {
	return this.internalWorker.generate(parameters, $.getRequest());
}

function workerGetTemplates() {
	return this.internalWorker.getTemplates($.getRequest());
}

// CONSTANTS

// ---- Worker Types ----
exports.WORKER_TYPE_DATA_STRUCTURES = "DataStructures";
exports.WORKER_TYPE_SCRIPTING_SERVICES = "ScriptingServices";
exports.WORKER_TYPE_WEB_CONTENT = "WebContent";
exports.WORKER_TYPE_WEB_CONTENT_FOR_ENTITY = "WebContentForEntity";