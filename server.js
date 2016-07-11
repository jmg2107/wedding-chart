var express = require('express');

var handler = require('./server/handler.js');

var app = express();

app.use('/', express.static(__dirname + '/public/client'));


app.get('/', function(req,res){
  console.log("something");

});


module.exports = app;