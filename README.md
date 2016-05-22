# Database API
- Module: **('api/database')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/9
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var database = require('api/database');
var response = require('api/http/response');

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

# Config API
- Module: **('api/config')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/16
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var config = require('api/config');
var response = require('api/http/response');

var properties = {
		"property1": "value1",
		"property2": "value2"
	}

config.set("/path/to/property", "key1", "value1");
config.setJson("/path/to/properties", JSON.stringify(properties));

response.println(config.get("/path/to/property", "key1"));
var result = JSON.parse(config.getJson("/path/to/properties"));
response.println(result.property2);

config.delete("/path/to/property");
config.delete("/path/to/properties");

response.println(config.get("/path/to/property"));
response.println(config.get("/path/to/properties"));

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

# Mail API
- Module **('api/mail')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/12
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var mail = require('api/mail');
var response = require('api/http/response');

var from = "dirigiblelabs@eclipse.org";
var to = "example@gmail.com";
var subject = "Subject";
var content = "Content";

mail.send(from, to, subject, content);

response.println("Mail sent");
response.flush();
response.close();
```

# Utils API

## XSS API
- Module **('api/utils/xss')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/12
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var xss = require('api/utils/xss');
var response = require('api/http/response');

raw = "John's bag";
escaped = xss.escapeSql(raw);
response.println(raw); // John's bag
response.println(escaped); // John''s bag

response.flush();
response.close();
```

# Console API
- Module **built-in**
- Issue: https://github.com/dirigiblelabs/core_api/issues/2
- Example:

```javascript
/* globals $ /
/ eslint-env node, dirigible */

console.info("Info message: %s", "Hello World!");
console.error("Error message.");
console.warn("Warning message.");
console.log("Log message.");
console.trace("Trace.");
```

# Messaging API
- Module **('api/messaging')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/11
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/http/response');
var messaging = require('api/messaging');

messaging.registerClient("client1");
messaging.registerClient("client2");

messaging.registerTopic("topic1");
messaging.registerTopic("topic2");

messaging.subscribe("client1", "topic1");

messaging.send("client1", "topic1", "Subject on Topic 1 from Client 1", "Message from Client1");
messaging.send("client1", "topic2", "Subject on Topic 2 from Client 1", "Message from Client1");

messaging.route();
var messages = messaging.receive("client1");

for(var i = 0; i < messages.length; i ++) {
    var message = messages[i];
    response.println(message.subject + " -> " + message.body);
}
response.flush();
response.close();
```


-----------


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

