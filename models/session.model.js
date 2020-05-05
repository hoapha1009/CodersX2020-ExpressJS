const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart:[String]
}, {
    versionKey: false 
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;
