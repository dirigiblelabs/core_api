/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');
var response = require('net/http/response');

files.createDirectory("../temp/test1");
var file = files.get("../temp/test1");
response.println("[File Exists?]: " + file.exists());
response.println("[File Is Directory?]: " + file.isDirectory());

files.createFile("../temp/test1/test1.txt");
file = files.get("../temp/test1/test1.txt");
response.println("[File Exists?]: " + file.exists());
response.println("[File Is File?]: " + file.isFile());

response.flush();
response.close();
