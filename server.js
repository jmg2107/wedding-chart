var express = require('express');

var handler = require('./server/handler.js');

var app = express();

app.get('/', handler.renderIndex);


module.exports = app;