const axios = require('axios');
const EthereumPrice = require('../services/ethereumPriceService');

// This is to get the price from coingecko
const fetchEthereumPrice = async () =>{
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price',{
            params:{
                ids: 'ethereum',
                vs_currencies: 'inr'
            }
        });

        const price = response.data.ethereum.inr;

        //saving it in MongoDB
        const newPrice = new EthereumPrice({price: price});
        await newPrice.save();

        console.log('Ethereum Price in INR:',price);
    } catch (error) {
        console.error('Error fetching ethereum price', error);
    }
}

module.exports = {fetchEthereumPrice};