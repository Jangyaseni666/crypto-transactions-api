const axios = require('axios');
const Transaction = require('../models/transactionModel');
const EthereumPrice = require('../services/ethereumPriceService');

// Controller to calculate the total expenses
const getExpenses = async (req,res) => {
    const address=req.params.address;

    try {
        //fetching the transaction
        const transactionData = await Transaction.findOne({address});
        const transactions = transactionData.transactions;
        if(!transactionData){
            res.status(404).json({error: 'Transaction for this address'});
        }

        //calculating expense for each transaction and summing them up.
        var totalExpenses=0;
        transactions.forEach(it => {
            totalExpenses += (it.gasUsed*it.gasPrice)/(1e18);
        });        
        console.log(totalExpenses);
        
        //fetching the latest ethereum price so, we sort them according to their timestamps in decreasing order.
        const ethPrice = await EthereumPrice.findOne().sort({timestamp:-1});
        if(!ethPrice){
            res.status(404).json({error: 'Failed to fetch the latest price'});
        }
        
        //Finally we send the total expenses and the current ethereum price
        res.json({
            totalExpenses: totalExpenses.toFixed(6), // rounded in order to make it easy to read
            ethereumPrice: ethPrice.price
        })

    } catch (error) {
        console.error('Server Error:',error);
        res.status(500).send({error: 'Server error: '+error.message})
    }
}

module.exports = {getExpenses};