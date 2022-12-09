import "./styles.css";
import { useState, useEffect } from "react";
import TableData from "./TableData";

// Use this API
// https://api.binance.us/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

export default function App() {
  // 1. STATE AND USEEFFECT HERE
  const [currency, setCurrency] = useState([
    {
      symbol: "",
      priceChange: "",
      bidPrice: ""
    }
  ]);

  useEffect(() => {
    fetch("https://api.binance.us/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        checkCurrency(data);
      });
  }, []);

  // 2. How will you "Pull out" the symbols we need?

  const currSymbols = [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "ADAUSDT",
    "DOGEUSDT",
    "WAVESUSD"
  ];

  // 3. ...and then store them in state?

  function checkCurrency(data) {
    const includedArr = [];
    const currArr = Object.entries(data);
    currArr.map((cur) =>
      cur.map((c) =>
        currSymbols.includes(c.symbol)
          ? includedArr.push({
              symbol: c.symbol,
              bidPrice: c.bidPrice,
              priceChangePercent: c.priceChangePercent
            })
          : ""
      )
    );
    setCurrency(includedArr);
  }

  const currencyTable = currency.map((curr, i) => {
    console.log(i);
    return (
      <TableData
        symbol={curr.symbol}
        key={i}
        number={i}
        bidPrice={curr.bidPrice}
        priceChangePercent={curr.priceChangePercent}
      />
    );
  });

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          {/* 3. Display data here... */}
          {/* HINT: Map to JSX */}
          {/* Up? Green + ▲ */}
          {/* Down? Red + ▼ */}
          {currencyTable}
          {/* <tr>
            <td>1</td>
            <td>Bitcoin</td>
            <td>$40,000</td>
            <td style={{ color: "green" }}>▲1.02%</td>
          </tr> */}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
