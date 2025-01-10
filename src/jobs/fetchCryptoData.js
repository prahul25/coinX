require('dotenv').config();
const axios = require('axios');
const CryptoData = require('../models/CryptoData');
const {COINGECKO_API_URL} = process.env

const fetchCryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];
    const url = `${COINGECKO_API_URL}/coins/markets`;

    const { data } = await axios.get(url, {
      params: { vs_currency: 'usd', ids: coins.join(',') }
    });

    const updates = data.map((coin) => ({
      coin: coin.id,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h
    }));

    await CryptoData.insertMany(updates);
    console.log(`Data updated for coins: ${coins.join(', ')}`);
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

fetchCryptoData();

module.exports = fetchCryptoData;
