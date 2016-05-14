/* globals $ */
/* eslint-env node, dirigible */

var database = require('api/database');
var response = require('api/http/response');

var datasource = database.getDatasource(); // default
//var datasource = db.getNamedDatasource("name-of-the-datasource");

var seq1 = datasource.getSequence("seq1");
if (!seq1.exists()) {
	seq1.create(100);
}

response.println(seq1.next());

response.flush();
response.close();
