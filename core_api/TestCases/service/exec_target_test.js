/* globals $ */
/* eslint-env node, dirigible */

var context = require('core/context');
var response = require('net/http/response');

// print in the response
response.setContentType("text/html; charset=UTF-8");
response.setCharacterEncoding("UTF-8");
response.println("Entering target...");
var input_param = context.get("input_param");
response.println("Printing input parameter: " + input_param);
response.println("Setting output parameter");
context.set("output_param", "output_param_value");
response.println("Exiting target...");



// do not close the response, if you plan to use it further
//response.flush();
//response.close();
