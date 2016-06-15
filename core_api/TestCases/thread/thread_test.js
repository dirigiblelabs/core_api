/* globals $ */
/* eslint-env node, dirigible */

var thread = require('core/thread');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");

// Define a JavaScript function
function runnable() {
	response.println("Hello World from a Thread!");
};

// Pass a JavaScript function
var worker = thread.create(runnable, "I am a thread");
response.println(worker.getName());
worker.start();
worker.join(); // to be able to print to the response

response.flush();
response.close();
