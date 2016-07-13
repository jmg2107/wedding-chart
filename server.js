var express = require('express');
var db = require('./server/config');
var bodyParser = require('body-parser');
var Guest = require('./server/models/guest');
var Guests = require('./server/collections/guest');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/client/'));


app.get('/', function(req,res){
  console.log('Do something');
});

app.post('/api/guests/', function(req, res){
  console.log("inputting new name: ", req.body.name);
  var name = req.body.name;

  new Guest({name : name})
    .fetch()
    .then(function(user) {
      if (!user) {
        var newGuest = new Guest({
          name: name,
          tableId: 0
        });
        newGuest.save()
          .then(function(newUser) {
            Guests.add(newUser);
          });
      } else {
        user.destroy()
        .then(function(){
          console.log("Removed guest");
        })
      }
      res.status(200).end();
    });
});

app.get('/api/guests/', function(req, res){
  Guests.reset().fetch().then(function(guests) {
    res.status(200).send(guests.models);
  });

});

app.post('/api/table/', function(req, res){
  console.log("inputting new table ", req.body.data);

  req.body.data.forEach(function(obj){
    var name = obj.name;
    var table = obj.tableId
    console.log("looking for ", name);

    new Guest({name : name})
      .fetch()
      .then(function(guest){
        if(guest){
          guest.save({tableId : table}, {patch: true})
          .then(function(changed){
            console.log("changed model ", changed);
          });

        } else {
          console.log('Guest not found!');
        }

      });
  });
  res.status(200).end();

});


module.exports = app;