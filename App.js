const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { fetchTransactions } = require('./controllers/transactionController');
const { fetchEthereumPrice } = require('./models/ethereumPriceModel');
const { getExpenses } = require('./controllers/expensesController');
require('dotenv').config();

const app = express();

//setting up mongodb connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB is connected"))
.catch( err => console.error("MongoDB couldn't be connected:",err));

//setup routes
app.get('/transactions/:address', fetchTransactions);
app.get('/expenses/:address', getExpenses);

//Scheduling the api call every 10 minutes
const time = 10*60*1000;  //10 mins in miliseconds
setTimeout(()=>{
    fetchEthereumPrice();
},time)

//server setup
app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:"+process.env.PORT);
    //first call when the server starts
    fetchEthereumPrice();
});