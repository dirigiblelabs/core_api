/* globals $ */
/* eslint-env node, dirigible */

var files = require('api/io/files');
var response = require('api/http/response');

var file = files.get("../temp/./..");

response.println("[File Exists?]: " + file.exists());
response.println("[File CanonicalPath]: " + file.getCanonicalPath());
response.println("[File Path]: " + file.getPath());
response.println("[File Name]: " + file.getName());
response.println("[File Parent]: " + file.getParent());
response.println("[File Is Directory?]: " + file.isDirectory());
response.println("[File Is File?]: " + file.isFile());
response.println("[File Is Hidden?]: " + file.isHidden());
response.println("[File Last Modified]: " + file.lastModified());
response.println("[File Length]: " + file.length());

response.flush();
response.close();
