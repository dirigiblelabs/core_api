/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var response = require('net/http/response');

var datasource = database.getDatasource();

var paging = datasource.getPaging();

// only one of both below will return non-empty result - depends on the database dialect
response.println(paging.genLimitAndOffset(100, 200));
response.println(paging.genTopAndStart(300, 400));

response.flush();
response.close();
