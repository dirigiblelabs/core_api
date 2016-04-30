/* globals $ */
/* eslint-env node, dirigible */

var response = require('api/response');

var cookie = {
    // mandatory
    name: "my_dirigible_cookie_name", 
    value: "my_dirigible_cookie_value",
    domain: "dirigible.eclipse.org",
    maxAge: 3600,
    path: "/",
    // optional
    comment: "my_dirigible_cookie_comment",
    secure: false,
    version: 1,
    httpOnly: true
}

response.addCookie(cookie);

response.println("Cookie added: " + cookie.name);
response.flush();
response.close();
