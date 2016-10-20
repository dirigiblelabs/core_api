/* globals $ */
/* eslint-env node, dirigible */

var streams = require('io/streams');
var response = require('net/http/response');

var bytes = streams.textToByteArray("Hello World!");
response.println("[Content as Bytes]: " + bytes);
var text = streams.byteArrayToText(bytes);
response.println("[Content as Text]: " + text);

response.flush();
response.close();
