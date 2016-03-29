# HTTP API 

- Module **('api/http')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var http = require('api/http');

var options = {
	hostname: 'http://services.odata.org',
  	path: '/V4/Northwind/Northwind.svc/'
};

var response = http.request(options);

//var response = http.get('https://nodejs.org/api/http.html')

$.getResponse().getWriter().println(response.statusMessage);
$.getResponse().getWriter().println(new java.lang.String(response.data));
$.getResponse().getWriter().flush();
$.getResponse().getWriter().close();
```
