/* globals $ */
/* eslint-env node, dirigible */

exports.get = function(options) {
	return handleRequest(options, 'GET');
};

exports.post = function(options) {
	return handleRequest(options, 'POST');
};

exports.put = function(options) {
	return handleRequest(options, 'PUT');
};

exports.delete = function(options) {
	return handleRequest(options, 'DELETE');
};

function handleRequest(options, method) {
	var url = options.host + ":" + (options.port ? options.port : 80) + (options.path ? options.path : '/');

	var request = createRequest(method, url);
	addHeaders(request, options.headers);

	var httpClient = $.getHttpUtils().createHttpClient(true);
	return createResponse(httpClient.execute(request), options);
}

function createRequest(method, url) {
	var request = null;
	switch(method) {
		case 'POST':
			request = $.getHttpUtils().createPost(url);
			break;
		case 'PUT':
			request = $.getHttpUtils().createPut(url);
			break;
		case 'DELETE':
			request = $.getHttpUtils().createDelete(url);
			break;
		default:
			request = $.getHttpUtils().createGet(url);
	}
	return request;
}

function addHeaders(httpRequest, headers) {
	for (var nextHeader in headers) {
		httpRequest.addHeader(nextHeader, headers[nextHeader]);
	}
}

function createResponse(httpResponse, options) {
	return {
		'statusCode': httpResponse.getStatusLine().getStatusCode(),
		'statusMessage': httpResponse.getStatusLine().getReasonPhrase(),
		'data': getResponseData(httpResponse, options),
		'httpVersion': httpResponse.getProtocolVersion(),
		'headers': getResponseHeaders(httpResponse)
	};
}

function getResponseData(httpResponse, options) {
    var entity = httpResponse.getEntity();
    var content = entity.getContent();

    var data = $.getIOUtils().toByteArray(content);

    $.getHttpUtils().consume(entity);
    if (options.binary) {
    	return data;
	} 
	return new java.lang.String(data);
}

function getResponseHeaders(httpResponse) {
	var headers = [];
	var httpResponseHeaders = httpResponse.getAllHeaders();
	for (var i = 0; i < httpResponseHeaders.length; i ++) {
		var header = httpResponseHeaders[i];
		headers.push({
			'name': header.getName(),
			'value': header.getValue()
		});
	}
	return headers;
}
