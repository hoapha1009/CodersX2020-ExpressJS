const mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    user_id: String,
    book_id: String,
    isComplete: Boolean
}, {
    versionKey: false 
});

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;