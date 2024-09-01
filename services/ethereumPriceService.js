const mongoose = require('mongoose');

// the schema to be used to store the ethereum price
const ethereumSchema = mongoose.Schema({
    price:{
        type: Number,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
})

const EthereumPrice = mongoose.model('EthereumPrice', ethereumSchema);
module.exports = EthereumPrice;