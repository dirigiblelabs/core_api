# Service API

- Module **('api/service')**
- **Response** example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var service = require('api/service');

var response = service.getResponse();

response.getWriter().println("Hello World!");
response.getWriter().flush();
response.getWriter().close();
```
- **Request** example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var service = require('api/service');

var request = service.getRequest();
var response = service.getResponse();

var name = request.getParameter("name");

response.getWriter().println("Hello " + name + "!");
response.getWriter().flush();
response.getWriter().close();
```
- **User Name** example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var service = require('api/service');

var response = service.getResponse();
var userName = service.getUserName();

response.getWriter().println("Hello " + userName + "!");
response.getWriter().flush();
response.getWriter().close();
```
- **Session** example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var service = require('api/service');

var response = service.getResponse();
var session = service.getSession();

response.getWriter().println("SessionId: " + session.getId());

var attributeNames = session.getAttributeNames();
while(attributeNames.hasMoreElements()) {
	var attributeName = attributeNames.nextElement();
	var value = session.getAttribute(attributeName);
	response.getWriter().println(attributeName + "=" + value);
}

response.getWriter().flush();
response.getWriter().close();
```
- **Context** example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var service = require('api/service');

var response = service.getResponse();
var context = service.getContext();

context.put("key", "value");

response.getWriter().println(context.get("key"));
response.getWriter().println(context);
response.getWriter().flush();
response.getWriter().close();
```

# HTTP API 

- Module **('api/http')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var http = require('api/http');
var service = require('api/service');

var response = service.getResponse();

var options = {
    hostname: 'http://services.odata.org',
    path: '/V4/Northwind/Northwind.svc/'
};

var httpResponse = http.request(options);
// var httpResponse = http.get('https://nodejs.org/api/http.html')


response.getWriter().println(httpResponse.statusMessage);
response.getWriter().println(new java.lang.String(httpResponse.data));
response.getWriter().flush();
response.getWriter().close();
```

# Mail API
- Module **('api/mail')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var mail = require('api/mail');
var service = require('api/service');
var response = service.getResponse();

var from = "dirigiblelabs@eclipse.org";
var to = "example@gmail.com";
var subject = "Subject";
var content = "Content";

mail.sendMail(from, to, subject, content);

response.getWriter().println("Mail sent");
response.getWriter().flush();
response.getWriter().close();
```

# Utils API
- Module **('api/utils')**
- **UUID** example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var utils = require('api/utils');
var service = require('api/service');
var response = service.getResponse();

var uuid = utils.getUuidUtils();

response.getWriter().println(uuid.randomUUID());
response.getWriter().flush();
response.getWriter().close();
```
