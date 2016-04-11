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

# Console API
- Module **('api/console')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var consoleApi = require('api/console');
var service = require('api/service');
var response = service.getResponse();

consoleApi.getConsole().println("Hello Console World!");

response.getWriter().println("Done.");
response.getWriter().flush();
response.getWriter().close();
```

# Datasource API
- Module **('api/datasource')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var datasourceApi = require('api/datasource');
var service = require('api/service');
var response = service.getResponse();

var datasource = datasourceApi.getDatasource();
var namedDatasources = datasourceApi.getNamedDatasources();

response.getWriter().println(datasource);
response.getWriter().println(namedDatasources);

response.getWriter().flush();
response.getWriter().close();
```

# Extensions API
- Module **('api/extensions')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var extensions = require('api/extensions');
var service = require('api/service');
var response = service.getResponse();

var confluenceInput = "* Bullet1\n" +
				 "* Bullet2\n" +
				 "*Bold*\n" +
				 "_Italic_";
var wiki = extensions.getWiki();
var htmlOutput = wiki.toHtml(confluenceInput);

response.setContentType("text/html");
response.getWriter().println(htmlOutput);
response.getWriter().flush();
response.getWriter().close();
```

# Messaging API
- Module **('api/messaging')**
- Example usage:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var messaging = require('api/messaging');
var service = require('api/service');
var response = service.getResponse();

var messageHub = messaging.getMessagingService();

messageHub.registerClient("client1");
messageHub.registerClient("client2");

messageHub.registerTopic("topic1");
messageHub.registerTopic("topic2");

messageHub.subscribe("client1", "topic1");

messageHub.send("client1", "topic1", "Subject on Topic 1 from Client 1", "Message from Client1");
messageHub.send("client1", "topic2", "Subject on Topic 2 from Client 1", "Message from Client1");

messageHub.route();
var messages = messageHub.receive("client1");

for(var i = 0; i < messages.size(); i ++) {
	var message = messages.get(i);
	response.getWriter().println(message.getSubject() + " -> " + message.getBody());
}
response.getWriter().flush();
response.getWriter().close();
```
