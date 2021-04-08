import React, { useState } from "react";
import axios from 'axios';

function App() {

  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [cardanoPrice, setCardanoPrice] = useState(0);

  React.useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(response => {
        setBitcoinPrice(response.data.bitcoin.usd);
      })
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd')
      .then(response => {
        setCardanoPrice(response.data.cardano.usd);
      })
  }, []);

  function updateBitcoin() {
    // console.log("bitcoin update " + bitcoinPrice);
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(response => {
        setBitcoinPrice(response.data.bitcoin.usd);
      })
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd')
      .then(response => {
        setCardanoPrice(response.data.cardano.usd);
      })
  }

  setInterval(updateBitcoin, 3000);

  return (
    <div>
      <div className="coin">
        <h1>Bitcoin</h1>
        <img src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579" alt=""></img>
        <p>Price: {bitcoinPrice}</p>
      </div>
      <div className="coin">
        <h1>Cardano</h1>
        <img src="https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860" alt=""></img>
        <p>Price: {cardanoPrice}</p>
      </div>
    </div>
  );
}

export default App;