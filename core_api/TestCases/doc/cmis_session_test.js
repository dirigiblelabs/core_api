/* globals $ */
/* eslint-env node, dirigible */

var cmis = require('doc/cmis');
var response = require('net/http/response');

var cmisSession = cmis.getSession();

response.println(cmisSession.getRepositoryInfo().getId());
response.println(cmisSession.getRepositoryInfo().getName());
response.flush();
response.close();

