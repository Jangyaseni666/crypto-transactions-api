const axios = require('axios');
const Transaction = require('../models/transactionModel');

//This is used to fetch transactions
const fetchTransactions = async (req, res) => {
    const address = req.params.address;
    
    try {
        
        //As there's a chance transactions could be already stored
        let transactionData = await Transaction.findOne({address})
        if(transactionData){
            return res.json(transactionData);
        }

        // response model
        const response = await axios.get('https://api.etherscan.io/api',{
            params:{
                module:'account',
                action: 'txlist',
                address: address,
                startblock:'0',
                endblock:'99999999',
                page:'1',
                offset:'10',
                sort:'asc',
                apikey: process.env.ETHERSCAN_API_KEY
            }
        });

        const transactions = response.data.result;

        //now we save the transaction in MongoDB
        const newTransaction = new Transaction({address, transactions});
        await newTransaction.save();

        res.json(newTransaction);
    } catch (error) {
        console.log('Error in fetching the transactions: ', error);
        res.status(500).send('Server Error:',error)
    }
}

module.exports = {fetchTransactions};