/* globals $ */
/* eslint-env node, dirigible */

var upload = require('net/http/upload');
var streams = require("io/streams");
var request = require('net/http/request');
var response = require('net/http/response');

if (request.getMethod() === "POST") {
	if (upload.isMultipartContent()) {
		// lazy flag set to true
		var files = upload.parseRequest(true);
		files.forEach(function(file) {
			response.println("[File Name] " + file.name);
			response.println("[File Data]");
			
			// 1. it is lazy, so you have to use loadData() to get the byte array
			var bytes = file.loadData();
			response.println(String.fromCharCode.apply(null, bytes));
			
			// 2. or direct copy to output stream
//			var outputStream = new streams.ByteArrayOutputStream();
//			file.copyData(outputStream);
//			response.println(String.fromCharCode.apply(null, outputStream.getBytes()));
		});
	} else {
		response.println("The request's content must be 'multipart'");
	}
} else if (request.getMethod() === "GET") {
	response.println("Use POST request.");
}

response.flush();
response.close();
