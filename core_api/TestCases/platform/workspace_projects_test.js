/* globals $ */
/* eslint-env node, dirigible */

var workspaces = require('platform/workspaces');
var response = require('net/http/response');

// Get the logged-in user's workspace
var workspace = workspaces.getWorkspace();
var workspaceRoot = workspace.getRoot();

response.println("Listing projects...");

var projects = workspaceRoot.getProjects();
for (var i in projects) {
	var project = projects[i];
	response.println(project.getName());
}

response.println("Projects listed.");

response.flush();
response.close();
