# Database API
- Module: **('api/db/database')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/9
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var database = require('api/db/database');
var response = require('api/response');

var datasource = database.getDatasource(); // default
//var datasource = db.getNamedDatasource("name-of-the-datasource");

var connection = datasource.getConnection();
try {
    var statement = connection.prepareStatement("select * from DGB_FILES where FILE_PATH like ?");
    var i = 0;
    statement.setString(++i, "%");
    var resultSet = statement.executeQuery();
    while (resultSet.next()) {
        response.println("[path]: " + resultSet.getString("FILE_PATH"));
    }
    resultSet.close();
    statement.close();
} catch(e) {
    console.trace(e);
    response.println(e.message);
} finally {
    connection.close();
}

response.flush();
response.close();
```

# HTTP API
## Response API

- Module **('api/http/response')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/1
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');

response.println("Hello World!");
response.flush();
response.close();
```

## Request API
- Module **('api/http/request')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/4
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var request = require('api/http/request');
var response = require('api/http/response');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
```
## Session API
- Module **('api/http/session')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/5
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var session = require('api/http/session');
var response = require('api/http/response');

response.println("SessionId: " + session.getId());

var attributeNames = session.getAttributeNames();
while(attributeNames.hasMoreElements()) {
	var attributeName = attributeNames.nextElement();
	var value = session.getAttribute(attributeName);
	response.println(attributeName + "=" + value);
}

response.flush();
response.close();
```

## HTTP Client API 
- Module **('api/http/client')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/3
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var http = require('api/http/client');
var response = require('api/http/response');

var options = {
    method: 'GET', // default
    host: 'http://services.odata.org',
    port: 80,
    path: '/V4/Northwind/Northwind.svc/',
    binary: false 
};

var httpResponse = http.request(options);

response.println(httpResponse.statusMessage);
response.println(httpResponse.data);
response.flush();
response.close();
```







---------------




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
