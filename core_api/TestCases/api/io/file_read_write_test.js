/* globals $ */
/* eslint-env node, dirigible */

var files = require('api/io/files');
var response = require('api/http/response');

files.createFile("../temp/test1/test5.txt");
var file = files.get("../temp/test1/test2.txt");
response.println("[File Exists?]: " + file.exists());
response.println("[File Is File?]: " + file.isFile());

var content = files.readText("../temp/test1/test5.txt");
response.println("[File Content]: " + content);

files.writeText("../temp/test1/test5.txt", "Some content");
response.println("[File Write]: " + content);

content = files.readText("../temp/test1/test5.txt");
response.println("[File Content]: " + content);

var bytes = files.read("../temp/test1/test5.txt");
response.println("[File Content as Bytes]: " + bytes);

bytes = [83, 84, 85];
files.write("../temp/test1/test5.txt", bytes);

content = files.readText("../temp/test1/test5.txt");
response.println("[File Content]: " + content);

response.flush();
response.close();
