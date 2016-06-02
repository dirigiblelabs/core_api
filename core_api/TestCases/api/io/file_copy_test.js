/* globals $ */
/* eslint-env node, dirigible */

var files = require('api/io/files');
var response = require('api/http/response');

files.createFile("../temp/test1/test2.txt");
var file = files.get("../temp/test1/test2.txt");
response.println("[File Exists?]: " + file.exists());
response.println("[File Is File?]: " + file.isFile());

files.copy("../temp/test1/test2.txt", "../temp/test1/test3.txt");
file = files.get("../temp/test1/test3.txt");
response.println("[File Copied Exists?]: " + file.exists());
response.println("[File Copied Is File?]: " + file.isFile());

files.move("../temp/test1/test3.txt", "../temp/test1/test4.txt");
file = files.get("../temp/test1/test4.txt");
response.println("[File Moved Exists?]: " + file.exists());
response.println("[File Moved Is File?]: " + file.isFile());

files.delete("../temp/test1/test2.txt");
file = files.get("../temp/test1/test2.txt");
response.println("[File Exists?]: " + file.exists());
response.println("[File Is File?]: " + file.isFile());


response.flush();
response.close();
