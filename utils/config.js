require('dotenv').config() // to be able to use environment variables

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const X_TOKEN = process.env.X_TOKEN;
const STORE_HASH = process.env.STORE_HASH;

module.exports = { MONGODB_URI, PORT, X_TOKEN, STORE_HASH }