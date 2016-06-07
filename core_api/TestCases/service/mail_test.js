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
