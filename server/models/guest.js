var db = require('../config');

var User = db.Model.extend({
  tableName: 'guests',
  initialize: function(){
    name: "Jennica Goo"
    //tableId : 1
  },

});

