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

exports.getSession = function() {
	var internalSession = $.getDocumentService().getSession();
	return new Session(internalSession);
};

/**
 * Session object
 */
function Session(internalSession) {
	this.internalSession = internalSession;
	this.getInternalObject = sessionGetInternalObject;
	this.getRepositoryInfo = sessionGetRepositoryInfo;
	this.getRootFolder = sessionGetRootFolder;
}

function sessionGetInternalObject() {
	return this.internalSession;
}

function sessionGetRepositoryInfo() {
	var internalRepositoryInfo = this.internalSession.getRepositoryInfo();
	return new RepositoryInfo(internalRepositoryInfo);
}

function sessionGetRootFolder() {
	var internalRootFolder = this.internalSession.getRootFolder();
	return new Folder(internalRootFolder);
}

/**
 * RepositoryInfo object
 */
function RepositoryInfo(internalRepositoryInfo) {
	this.internalRepositoryInfo = internalRepositoryInfo;
	this.getInternalObject = repositoryInfoGetInternalObject;
	this.getId = repositoryInfoGetId;
	this.getName = repositoryInfoGetName;
}

function repositoryInfoGetInternalObject() {
	return this.internalRepositoryInfo;
}

function repositoryInfoGetId() {
	return this.internalRepositoryInfo.getId();
}

function repositoryInfoGetName() {
	return this.internalRepositoryInfo.getName();
}

/**
 * Folder object
 */
function Folder(internalFolder) {
	this.internalFolder = internalFolder;
	this.getInternalObject = folderGetInternalObject;
	this.createFolder = folderCreateFolder;
	this.getChildren = folderGetChildren;
	this.getPath = folderGetPath;
	this.isRootFolder = folderIsRootFolder;
	this.getFolderParent = folderGetFolderParent;
	this.delete = folderDelete;
}

function folderGetInternalObject() {
	return this.internalFolder;
}

function folderCreateFolder(properties) {
	var map = new java.util.HashMap();
	
	for (var property in properties) {
	    if (properties.hasOwnProperty(property)) {
	        map.put(property, properties[property]);
	    }
	}

	var newFolder = this.internalFolder.createFolder(map);
	return new Folder(newFolder);
}

function folderGetChildren() {
	var children = [];
	var internalChildren = this.internalFolder.getChildren();
	var iter = internalChildren.iterator();
	while (iter.hasNext()) {
		var internalCmisObject = iter.next();
		var child = new CmisObject(internalCmisObject);
		children.push(child);
	}
	return children;
}

function folderGetPath() {
	return this.internalFolder.getPath();
}

function folderIsRootFolder() {
	return this.internalFolder.isRootFolder();
}

function folderGetFolderParent() {
	var internalParentFolder = this.internalFolder.getFolderParent();
	return new Folder(internalParentFolder);
}

function folderDelete() {
	return this.internalFolder.delete(true);
}

/**
 * CmisObject object
 */
function CmisObject(internalCmisObject) {
	this.internalCmisObject = internalCmisObject;
	this.getInternalObject = cmisObjectGetInternalObject;
	this.getId = cmisObjectGetId;
	this.getName = cmisObjectGetName;
	this.delete = cmisObjectDelete;
}

function cmisObjectGetInternalObject() {
	return this.internalCmisObject;
}

function cmisObjectGetId() {
	return this.internalCmisObject.getId();
}

function cmisObjectGetName() {
	return this.internalCmisObject.getName();
}

function cmisObjectDelete() {
	return this.internalCmisObject.delete(true);
}


// ---- base ----
exports.NAME = "cmis:name";
exports.OBJECT_ID = "cmis:objectId";
exports.OBJECT_TYPE_ID = "cmis:objectTypeId";
exports.BASE_TYPE_ID = "cmis:baseTypeId";
exports.CREATED_BY = "cmis:createdBy";
exports.CREATION_DATE = "cmis:creationDate";
exports.LAST_MODIFIED_BY = "cmis:lastModifiedBy";
exports.LAST_MODIFICATION_DATE = "cmis:lastModificationDate";
exports.CHANGE_TOKEN = "cmis:changeToken";

// ---- document ----
exports.IS_IMMUTABLE = "cmis:isImmutable";
exports.IS_LATEST_VERSION = "cmis:isLatestVersion";
exports.IS_MAJOR_VERSION = "cmis:isMajorVersion";
exports.IS_LATEST_MAJOR_VERSION = "cmis:isLatestMajorVersion";
exports.VERSION_LABEL = "cmis:versionLabel";
exports.VERSION_SERIES_ID = "cmis:versionSeriesId";
exports.IS_VERSION_SERIES_CHECKED_OUT = "cmis:isVersionSeriesCheckedOut";
exports.VERSION_SERIES_CHECKED_OUT_BY = "cmis:versionSeriesCheckedOutBy";
exports.VERSION_SERIES_CHECKED_OUT_ID = "cmis:versionSeriesCheckedOutId";
exports.CHECKIN_COMMENT = "cmis:checkinComment";
exports.CONTENT_STREAM_LENGTH = "cmis:contentStreamLength";
exports.CONTENT_STREAM_MIME_TYPE = "cmis:contentStreamMimeType";
exports.CONTENT_STREAM_FILE_NAME = "cmis:contentStreamFileName";
exports.CONTENT_STREAM_ID = "cmis:contentStreamId";

// ---- folder ----
exports.PARENT_ID = "cmis:parentId";
exports.ALLOWED_CHILD_OBJECT_TYPE_IDS = "cmis:allowedChildObjectTypeIds";
exports.PATH = "cmis:path";

// ---- relationship ----
exports.SOURCE_ID = "cmis:sourceId";
exports.TARGET_ID = "cmis:targetId";

// ---- policy ----
exports.POLICY_TEXT = "cmis:policyText";

