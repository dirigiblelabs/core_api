/* globals $ */
/* eslint-env node, dirigible */

var workspaces = require('platform/workspaces');
var response = require('net/http/response');
var streams = require('io/streams');

// Get the logged-in user's workspace
var workspace = workspaces.getWorkspace();
var workspaceRoot = workspace.getRoot();

response.println("Create a project programmatically...");

var project = workspaceRoot.getProject("A_Programmatic_Project");
if (!project.exists()) {
	project.create();
}

response.println("Project created.");

project.open();

response.println("Project opened.");

var folderScriptingServices = project.getFolder("ScriptingServices");
if (!folderScriptingServices.exists()) {
	folderScriptingServices.create();
}

response.println("Folder ScriptingServices created.");

var fileProgrammaticService = folderScriptingServices.getFile("programmatic_service.js");
if (!fileProgrammaticService.exists()) {
	var bytes = streams.textToByteArray("var response = require('net/http/response');\nresponse.println('Hello World!');\nresponse.flush();\nresponse.close();");
	fileProgrammaticService.create(streams.createByteArrayInputStream(bytes));
}
response.println("File programmatic_service.js created.");

// you can use 'lifecycle' module to activate/publish the service

response.flush();
response.close();
