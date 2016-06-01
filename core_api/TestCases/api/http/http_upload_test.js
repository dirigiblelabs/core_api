/* globals $ */
/* eslint-env node, dirigible */

var upload = require('api/http/upload');
var request = require('api/http/request');
var response = require('api/http/response');


if (request.getMethod() === "POST") {
	if (upload.isMultipartContent()) {
		var files = upload.parseRequest();
		
		files.forEach(function(file) {
			response.println("[File Name] " + file.name);
			response.println("[File Data]");
//			response.println(file.data); // as a raw byte array or as a string below
			response.println(String.fromCharCode.apply(null, file.data));
		});
		
	} else {
		response.println("The request's content must be 'multipart'");
	}

} else if (request.getMethod() === "GET") {
	response.println("Use POST request.");
}
	
response.flush();
response.close();
