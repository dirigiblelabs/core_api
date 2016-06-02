/* globals $ */
/* eslint-env node, dirigible */

var indexing = require('api/service/indexing');
var response = require('api/http/response');

var index = indexing.getIndex("myIndex");
var document1 = {
       "id": "1",
       "content": "some cool content 1"
    };
var document2 = {
       "id": "2",
       "content": "some cool content 2"
    };

index.add(document1);
index.add(document2);

var results = index.search("cool");
for (var i=0;i<results.length;i++) {
	var result = results[i];
    response.println("[Found for 'cool']: " + result.id);    
}

results = index.search("1");
for (var i=0;i<results.length;i++) {
	result = results[i];
    response.println("[Found for '1']: " + result.id);
}

results = index.search("2");
for (var i=0;i<results.length;i++) {
	result = results[i];
    response.println("[Found for '2']: " + result.id);
}

index.clear();

response.flush();
response.close();
