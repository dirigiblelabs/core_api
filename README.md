# Overview
Enterprise JavaScript APIs build for [Eclipse Dirigible](https://github.com/eclipse/dirigible).

The complete set of APIs, documentation and examples can be found [here](http://api.dirigible.io).

# Database API
- Module: **('db/database')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/9
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var database = require('db/database');
var response = require('net/http/response');

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
- Module: **('core/config')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/16
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var config = require('core/config');
var response = require('net/http/response');

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

- Module **('net/http/response')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/1
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');

response.println("Hello World!");
response.flush();
response.close();
```

## Request API
- Module **('net/http/request')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/4
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var request = require('net/http/request');
var response = require('net/http/response');

var method = request.getMethod();

response.println("[Method]: " + method);
response.flush();
response.close();
```
## Session API
- Module **('net/http/session')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/5
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var session = require('net/http/session');
var response = require('net/http/response');

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
- Module **('net/http/client')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/3
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var http = require('net/http/client');
var response = require('net/http/response');

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
- Module **('service/mail')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/12
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var mail = require('service/mail');
var response = require('net/http/response');

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
- Module **('utils/xss')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/12
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var xss = require('utils/xss');
var response = require('net/http/response');

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
- Module **('service/messaging')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/11
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var response = require('net/http/response');
var messaging = require('service/messaging');

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


# Files API
- Module **('io/files')**
- Issue: https://github.com/dirigiblelabs/core_api/issues/21
- Example:

```javascript
/* globals $ */
/* eslint-env node, dirigible */

var files = require('io/files');
var response = require('net/http/response');

var file = files.get("../temp/./..");

response.println("[File Exists?]: " + file.exists());
response.println("[File CanonicalPath]: " + file.getCanonicalPath());
response.println("[File Path]: " + file.getPath());
response.println("[File Name]: " + file.getName());
response.println("[File Parent]: " + file.getParent());
response.println("[File Is Directory?]: " + file.isDirectory());
response.println("[File Is File?]: " + file.isFile());
response.println("[File Is Hidden?]: " + file.isHidden());
response.println("[File Last Modified]: " + file.lastModified());
response.println("[File Length]: " + file.length());

response.flush();
response.close();
```

Fore more samples see the TestCases folder and the Issues for more details.
