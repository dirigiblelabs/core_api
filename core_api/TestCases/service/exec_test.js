/* globals $ */
/* eslint-env node, dirigible */

var exec = require('service/exec');
var response = require('net/http/response');

// Test
var result = exec.test("/service/exec_target_test.js", {"input_param": "input_param_value"});

response.println("Printing output parameter: " + result.context.output_param);

// use also exec.js, exec.flow, exec.job, exec.sql, exec.command ...

response.flush();
response.close();
