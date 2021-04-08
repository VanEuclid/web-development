const express = require("express");
const axios = require("axios");

const app = express();

app.get("/bitcoin", (req, res) => {
    axios.get('https://api.coingecko.com/api/v3/coins/bitcoin?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false')
        .then(response => {
            console.log(response.data.market_data.current_price.usd);
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/cardano", (req, res) => {
    axios.get('https://api.coingecko.com/api/v3/coins/cardano?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
        .then(response => {
            console.log(response.data.market_data.current_price.usd);
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(3000, () => {
    console.log("server running on port 3000");
});