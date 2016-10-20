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

var folderWebContent = project.getFolder("WebContent");
if (!folderWebContent.exists()) {
	folderWebContent.create();
}

response.println("Folder WebContent created.");

var fileProgrammaticPage = folderWebContent.getFile("index.html");
if (!fileProgrammaticPage.exists()) {
	var bytes = streams.textToByteArray("empty");
	fileProgrammaticPage.create(streams.createByteArrayInputStream(bytes));
}
response.println("File index.html created.");

var bytes = streams.textToByteArray("<html>Hello World!</html>");
fileProgrammaticPage.setContents(streams.createByteArrayInputStream(bytes));

response.println("Content set into File index.html.");

var inputStream = fileProgrammaticPage.getContents();

response.println("Content of the file is: " + streams.readText(inputStream));

// you can use 'lifecycle' module to activate/publish the service

response.flush();
response.close();
