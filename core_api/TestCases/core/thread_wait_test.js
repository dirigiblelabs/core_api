/* globals $ */
/* eslint-env node, dirigible */

var thread = require('core/thread');
var response = require('net/http/response');

response.setContentType("text/plain; charset=UTF-8");
response.setCharacterEncoding("UTF-8");

var obj = { 
	f: thread.sync(function () { 
    		response.println("I am synchronized");
    		response.flush();
    		this.wait(2000);
    		response.println("I waited 2s");
   	})
};

// 'f' is a "synchronized" method.
obj.f();

response.flush();
response.close();
