var db = require('../config');

var Guest = db.Model.extend({
  tableName: 'guests',
  initialize: function(){
    tableId: 0
  },

});

module.exports = Guest;