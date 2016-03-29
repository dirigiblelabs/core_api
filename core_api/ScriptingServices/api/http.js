/* globals $ */
/* eslint-env node, dirigible */

exports.get = function(url) {
    var request = createRequest('GET', url);
    var httpClient = $.getHttpUtils().createHttpClient(true);

    return createResponse(httpClient.execute(request));
};

exports.request = function(options) {
	var url = options.hostname + ":" + (options.port ? options.port : 80) + (options.path ? options.path : '/');

	var request = createRequest(options.method, url);
	addHeaders(request, options.headers);

	var httpClient = $.getHttpUtils().createHttpClient(true);
	return createResponse(httpClient.execute(request));
};

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

function createResponse(httpResponse) {
	return {
		'statusCode': httpResponse.getStatusLine().getStatusCode(),
		'statusMessage': httpResponse.getStatusLine().getReasonPhrase(),
		'data': getResponseData(httpResponse),
		'httpVersion': httpResponse.getProtocolVersion(),
		'headers': getResponseHeaders(httpResponse)
	};
}

function getResponseData(httpResponse) {
    var entity = httpResponse.getEntity();
    var content = entity.getContent();

   var data = $.getIOUtils().toByteArray(content);

   $.getHttpUtils().consume(entity);
    return data;
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
