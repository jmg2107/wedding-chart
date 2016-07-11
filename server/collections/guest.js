var db = require('../config');
var Guest = require('../models/guest');

var Guests = new db.Collection();

Guests.model = Guest;

module.exports = Guests;