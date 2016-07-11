var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public/client/'));


app.get('/', function(req,res){
  console.log('Do something');
});


module.exports = app;