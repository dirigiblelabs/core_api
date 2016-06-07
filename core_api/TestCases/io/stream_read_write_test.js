/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var response = require('net/http/response');

var outputStream = streams.createByteArrayOutputStream();

streams.writeText(outputStream, "Some text content");

var bytes = outputStream.getBytes();
response.println("[Stream Content as Bytes]: " + bytes);

var text = String.fromCharCode.apply(String, bytes);
response.println("[Stream Content as Text]: " + text);

var inputStream = streams.createByteArrayInputStream(bytes);
var outputStreamCopy = streams.createByteArrayOutputStream();
streams.copy(inputStream, outputStreamCopy);
var copiedBytes = outputStreamCopy.getBytes();
var copiedText = String.fromCharCode.apply(String, copiedBytes);
response.println("[Stream Copied Content as Text]: " + copiedText);

response.flush();
response.close();
