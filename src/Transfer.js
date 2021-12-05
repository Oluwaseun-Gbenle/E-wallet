import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";

function Transfer({ handleInput }) {
  const [data, setData] = useState(null);
  const [select, setSelect] = useState("USD");
  const [amount, setAmount] = useState(0);
  const initialBalance = 391765;
  const [balance, setBalance] = useState(initialBalance);
  const [sign, setSign] = useState("$");

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

  const details = {
    users: [
      {
        fname: "Lola",
        lname: "James",
        walletbalance: 10456,
      },

      {
        fname: "Chinedu",
        lname: "Okoro",
        walletbalance: 59876,
      },

      {
        fname: "Mahmoud",
        lname: "Audu",
        walletbalance: 295615,
      },

      {
        fname: "Stephen",
        lname: "Sans",
        walletbalance: 1002334,
      },

      {
        fname: "James",
        lname: "Alfred",
        walletbalance: 345664,
      },

      {
        fname: "Rita",
        lname: "Rogers",
        walletbalance: 2000,
      },
    ],
  };

  handleInput = (event) => {
    setAmount(event.target.value);
  };

  const roundOff = (value) =>
    value >= 1000000000
      ? (Math.floor(value / 1000000000) * 1000000000) / 1000000000 + "B"
      : value >= 1000000
      ? (Math.floor(value / 1000000) * 1000000) / 1000000 + "M"
      : value >= 1000
      ? (Math.floor(value / 1000) * 1000) / 1000 + "k"
      : value;

  return (
    <div id="transfer">
      <div className="transferHeader">
        <div className="transferText1Box">
          <div className="back-icon">
            <a href="/">
              <img
                className="arrow-1"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEyem0wIDFjNi4wNzEgMCAxMSA0LjkyOSAxMSAxMXMtNC45MjkgMTEtMTEgMTEtMTEtNC45MjktMTEtMTEgNC45MjktMTEgMTEtMTF6bS00LjgyOCAxMS41bDQuNjA4IDMuNzYzLS42NzkuNzM3LTYuMTAxLTUgNi4xMTItNSAuNjY2Ljc1My00LjYwNCAzLjc0N2gxMS44MjZ2MWgtMTEuODI4eiIvPjwvc3ZnPg=="
                alt="arrow"
              />
            </a>
          </div>
          <div className="transferText1">Transfer</div>
        </div>
        <p className="transferText2">Here, you can transfer money to anyone</p>
      </div>
      <div className="display1">
        <div className="currencyArea">
          <div className="Balancetext">Your Balance is</div>
          <h1 className="price">
            {sign}
            {roundOff(balance)}
          </h1>
          <span class="mainbalance">
            {sign}
            {balance}
          </span>
        </div>

        <div className="currencySelection">
          <div className="currencyText">Select Your Currency</div>
          <div className="btns">
            <button
              className="btn"
              onClick={() => {
                setBalance(initialBalance);
              }}
            >
              ($)
            </button>
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
        </div>
      </div>
      <div className="display2">
        <div className="form2">
          <p className="inputText1">Who would you like to send money to?</p>
          <select className="input"></select>
        </div>
        <div className="form2">
          <p className="inputText2">How much would you like to send?</p>
          <input
            className="input2"
            type="number"
            name="amount"
            list="amount"
            placeholder="e.g $4,000"
            onChange={handleInput}
            value={amount}
          />
          <select
            id="amount"
            onChange={(event) => setSelect(event.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="NGN">NGN</option>
          </select>
          <p>
            {select == "EUR"
              ? "\u20AC" + amount * data.EUR
              : select == "NGN"
              ? "\u20A6" + amount * data.NGN
              : "$" + amount}
          </p>
        </div>
      </div>
      <div className="sendCont">
        <div className="sendBtn">
          <a href="/Confirmation">Send</a>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
