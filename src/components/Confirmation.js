import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";
import "./Balance.css";
import Balance from "./Balance";

function Confirmation({ amount, name }) {
  const initialBalance = 391765;
  const sign = "$";
  const [data, setData] = useState(null);

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

  const roundOff = (value) =>
    value >= 1000000000
      ? (Math.floor(value / 1000000000) * 1000000000) / 1000000000 + "B"
      : value >= 1000000
      ? (Math.floor(value / 1000000) * 1000000) / 1000000 + "M"
      : value >= 1000
      ? (Math.floor(value / 1000) * 1000) / 1000 + "k"
      : value;

  return (
    <div className="confirmation">
      <div className="transferHeader">
        <div className="transferText1Box">
          <div className="back-icon">
            <a href="/Transfer">
              <img
                className="arrow-1"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEyem0wIDFjNi4wNzEgMCAxMSA0LjkyOSAxMSAxMXMtNC45MjkgMTEtMTEgMTEtMTEtNC45MjktMTEtMTEgNC45MjktMTEgMTEtMTF6bS00LjgyOCAxMS41bDQuNjA4IDMuNzYzLS42NzkuNzM3LTYuMTAxLTUgNi4xMTItNSAuNjY2Ljc1My00LjYwNCAzLjc0N2gxMS44MjZ2MWgtMTEuODI4eiIvPjwvc3ZnPg=="
                alt="arrow"
              />
            </a>
          </div>
          <div className="transferText1">Confirm Transfer</div>
        </div>
        <p className="transferText2">
          You are about to make an irreversible transaction
        </p>
      </div>
      <div className="display1">
        <div className="currencyArea">
          <div className="Balancetext">You are about to send</div>
          <h1 className="price">
            {sign}
            {roundOff(amount)}
          </h1>
          <span class="mainbalance">{amount}</span>
        </div>

        <div className="currencySelection">
          <div className="btns" style={{ marginTop: "33px" }}>
            <button className="btn" onClick={() => amount}>
              ($)
            </button>
            <button
              className="btn"
              onClick={() => "\u20A6" + amount * data.NGN}
            >
              (&#8358;)
            </button>
            <button
              className="btn"
              onClick={() => "\u20AC" + amount * data.EUR}
            >
              (&euro;)
            </button>
          </div>
        </div>
      </div>
      <div className="transferInitiation" style={{ paddingTop: "50px" }}>
        <p className="introText2">To</p>
        <div className="transferBox" style={{ width: "200px" }}>
          {name}
        </div>
      </div>
      <div className="sendCont">
        <div onClick={initialBalance - 5} className="sendBtn">
          <a href="/">Confirm</a>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
