/* globals $ */
/* eslint-env node, dirigible */

var threads = require('core/threads');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");
response.setCharacterEncoding("UTF-8");

var obj = { 
	syncWait: threads.sync(function () { 
    		console.log("I am synchronized waiter");
    		this.wait(5000);
    		console.log("I waited 5s or I was notified?");
   	}),
   	syncNotify: threads.sync(function () { 
    		console.log("I am synchronized notifier");
    		this.notifyAll();
    		console.log("I notified all");
   	})
};

function waitable() {
	// 'syncWait' is a "synchronized" method.
	obj.syncWait();
};

function notifyable() {
	// 'syncWait' is a "synchronized" method.
	obj.syncNotify();
};

var waiter = threads.create(waitable, "I am the waiter thread");
console.log(waiter.getName());
waiter.start();
console.log("Waiter started.");
//waiter.join(); // to be able to print to the response

var notifier = threads.create(notifyable, "I am the notifier thread");
console.log(notifier.getName());
notifier.start();
console.log("Notifier started.");

response.println("See log...");

response.flush();
response.close();
