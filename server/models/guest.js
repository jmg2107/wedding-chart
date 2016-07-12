var db = require('../config');

var Guest = db.Model.extend({
  tableName: 'guests',
  initialize: function(){
    name: "Jennica Goo"
    //tableId : 1
  },

});

module.exports = Guest;