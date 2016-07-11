var express = require('express');
var db = require('./server/config');
var User = require('./server/models/guest');
var Users = require('./server/collections/guest');

var app = express();

app.use(express.static(__dirname + '/public/client/'));


app.get('/', function(req,res){
  console.log('Do something');
});


module.exports = app;