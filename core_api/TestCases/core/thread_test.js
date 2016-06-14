/* globals $ */
/* eslint-env node, dirigible */

var thread = require('core/thread');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");

// Define a JavaScript function
function runnable() {
	response.println("Hello World from a Thread!");
};

// Pass the JavaScript function instead of an object that implements
var worker = thread.create(runnable, "I am a thread");
response.println(worker.getName());
worker.start();
worker.join();

response.flush();
response.close();
