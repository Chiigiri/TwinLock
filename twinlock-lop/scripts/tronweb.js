require('dotenv').config();
const { TronWeb } = require('tronweb'); // ✅ destructure TronWeb from module

const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    privateKey: process.env.TRON_PRIVATE_KEY
});

module.exports = tronWeb;
