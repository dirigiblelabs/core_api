/* globals $ */
/* eslint-env node, dirigible */

var streams = require('api/io/streams');
var response = require('api/http/response');

var outputStream = streams.createByteArrayOutputStream();

streams.writeText(outputStream, "Some text content");

var bytes = outputStream.getBytes();
response.println("[Stream Content as Bytes]: " + bytes);

var text = String.fromCharCode.apply(String, bytes);
response.println("[Stream Content as Text]: " + text);

response.flush();
response.close();
