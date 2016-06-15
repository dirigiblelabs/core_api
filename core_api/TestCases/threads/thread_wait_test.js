/* globals $ */
/* eslint-env node, dirigible */

var threads = require('core/threads');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");
response.setCharacterEncoding("UTF-8");

var obj = { 
	syncWait: threads.sync(function () { 
    		response.println("I am synchronized waiter");
    		this.wait(2000);
    		response.println("I waited 2s");
   	})
};

function waitable() {
	// 'syncWait' is a "synchronized" method.
	obj.syncWait();
};

var waiter = threads.create(waitable, "I am the waiter thread");
response.println(waiter.getName());
waiter.start();
response.println("Waiter started.");
waiter.join(); // to be able to print to the response

response.flush();
response.close();
