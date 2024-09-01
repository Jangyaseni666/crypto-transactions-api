const mongoose = require('mongoose');

// the schema to be used to store transactions against addresses
const transactionSchema = new mongoose.Schema({
    address:{
        type: String,
        required: true,
        unique: true
    },
    transactions:{
        type: Array,
        required: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;