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

exports.getWorkspace = function() {
	return new Workspace($.getWorkspacesService().getWorkspace($.getRequest()));
};

exports.getUserWorkspace = function(user) {
	return new Workspace($.getWorkspacesService().getUserWorkspace(user, $.getRequest()));
};

/**
 * Workspace object
 */
function Workspace(internalWorkspace) {
	this.internalWorkspace = internalWorkspace;
	this.getInternalObject = workspaceGetInternalObject;
	this.getRoot = workspaceGetRoot;
}

function workspaceGetInternalObject() {
	return this.internalWorkspace;
}

function workspaceGetRoot() {
	var internalWorkspaceRoot = this.internalWorkspace.getRoot();
	return new WorkspaceRoot(internalWorkspaceRoot);
}

/**
 * WorkspaceRoot object
 */
function WorkspaceRoot(internalWorkspaceRoot) {
	this.internalWorkspaceRoot = internalWorkspaceRoot;
	this.getInternalObject = workspaceRootGetInternalObject;
	this.getProjects = workspaceRootGetProjects;
}

function workspaceRootGetInternalObject() {
	return this.internalWorkspaceRoot;
}

function workspaceRootGetProjects() {
	var internalProjects = this.internalWorkspaceRoot.getProjects();
	var projects = [];
	for (var i=0;i<internalProjects.length;i++) {
    	var project = new Project(internalProjects[i]);
    	projects.push(project);
	}
	return projects;
}

/**
 * Project object
 */
function Project(internalProject) {
	this.internalProject = internalProject;
	this.getInternalObject = projectGetInternalObject;
	this.getName = projectGetName;
}

function projectGetInternalObject() {
	return this.internalProject;
}

function projectGetName() {
	return this.internalProject.getName();
}