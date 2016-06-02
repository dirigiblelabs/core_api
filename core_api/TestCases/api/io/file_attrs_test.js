/* globals $ */
/* eslint-env node, dirigible */

var files = require('api/io/files');
var response = require('api/http/response');

var file = files.get("../temp");

response.println("[File Executable?]: " + file.isExecutable());
response.println("[File Readable?]: " + file.isReadable());
response.println("[File Writable?]: " + file.isWritable());

response.println("[File Executable = false]: " + file.setExecutable(false));
response.println("[File Readable = false]: " + file.setReadable(false));
response.println("[File Writable = false]: " + file.setWritable(false));

response.println("[File Executable?]: " + file.isExecutable());
response.println("[File Readable?]: " + file.isReadable());
response.println("[File Writable?]: " + file.isWritable());

response.println("[File Executable = true]: " + file.setExecutable(true));
response.println("[File Readable = true]: " + file.setReadable(true));
response.println("[File Writable = true]: " + file.setWritable(true));

response.println("[File Executable?]: " + file.isExecutable());
response.println("[File Readable?]: " + file.isReadable());
response.println("[File Writable?]: " + file.isWritable());

response.flush();
response.close();
