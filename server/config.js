  var Bookshelf = require('bookshelf');
  var path = require('path');

  var db = Bookshelf.initialize({
    client: 'sqlite3',
    connection: {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'password',
      database: 'seatingdb',
      charset: 'utf8',
      filename: path.join(__dirname, '../db/shortly.sqlite')
    }
  });

  db.knex.schema.hasTable('guests').then(function(exists) {
    if (!exists) {
      db.knex.schema.createTable('guests', function (user) {
        user.increments('id').primary();
        user.string('name', 100).unique();
        //user.integer('tableId');
      }).then(function (table) {
        console.log('Created Table', table);
      });
    }
  });

  module.exports = db;