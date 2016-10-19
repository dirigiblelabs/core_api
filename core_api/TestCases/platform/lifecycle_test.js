/* globals $ */
/* eslint-env node, dirigible */

var lifecycle = require('platform/lifecycle');
var response = require('net/http/response');

// Publish All Projects
lifecycle.publishAll();

response.println("All projects have been published.");

response.flush();
response.close();
