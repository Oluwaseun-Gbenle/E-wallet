import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Balance.css";

function Balance() {
  const initialBalance = 391675;
  const [balance, setBalance] = useState(initialBalance);
  const [sign, setSign] = useState("$");
  const [data, setData] = useState(null);

  const roundOff = (value) =>
    value >= 1000000000
      ? (Math.floor(value / 1000000000) * 1000000000) / 1000000000 + "B"
      : value >= 1000000
      ? (Math.floor(value / 1000000) * 1000000) / 1000000 + "M"
      : value >= 1000
      ? (Math.floor(value / 1000) * 1000) / 1000 + "k"
      : value;

  useEffect(() => {
    async function fetchData() {
      await axios("https://api.exchangerate-api.com/v4/latest/USD")
        .then((response) => {
          setData(response.data.rates);
        })
        .catch((err) => console.log("Request Failed", err));
    }
    fetchData();
  }, []);
  console.log(data);

  return (
    <div id="balance">
      <div className="intro">
        <h2 className="introText">Hi there King/Queen,</h2>
        <p className="introText2">Welcome to your wallet Dashboard</p>
      </div>

      <div className="balanceBox">
        <div className="accBalance">
          <p>BALANCE</p>
          <p className="fig">
            {sign}
            {roundOff(balance)}
          </p>
        </div>

        <div className="convert">
          <p>CONVERT</p>
          <button
            className="btn"
            onClick={() => {
              setSign("\u20A6");
              setBalance(initialBalance * data.NGN);
            }}
          >
            (&#8358;)
          </button>
          <button
            className="btn"
            onClick={() => {
              setSign("\u20AC");
              setBalance(initialBalance * data.EUR);
            }}
          >
            (&euro;)
          </button>
        </div>
        <span class="mainbalance">
          {sign}
          {balance}
        </span>
      </div>

      <div className="transferInitiation" style={{ paddingTop: "50px" }}>
        <p className="introText2">What would you like to do today?</p>
        <div className="transferBox">
          <a style={{ textDecoration: "none" }} href="/Transfer">
            Transfer
          </a>
        </div>
      </div>

      <div className="introText2" style={{ paddingTop: "30px" }}>
        Transaction history
      </div>
      <div className="history">
        <div className="historyCase">
          <p className="name">Credit from John Usman</p>
          <p className="amount">$1000</p>
        </div>
        <div className="historyCase">
          <p className="name">Transfer to Olaide Ismail</p>
          <p className="amount" style={{ color: "rgb(207, 5, 5)" }}>
            -$5200
          </p>
        </div>
      </div>
    </div>
  );
}

export default Balance;
