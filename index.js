var app = require('./server.js');

//if we're on Heroku, the port will be assigned to the
//process.env variable.
 var port = process.env.PORT || 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
