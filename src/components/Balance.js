import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Balance.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { valueAmount } from "../slices/amountSlice";
import { valueUser } from "../slices/userSlice";
import { valueBalance } from "../slices/balanceSlice";
import {saveBalance} from "../slices/balanceSlice";
import { useDispatch } from "react-redux";
import { users } from "./details";


function Balance() {
  const initialBalance = useSelector(valueBalance)
  const [balance, setBalance] = useState(initialBalance);
  const [sign, setSign] = useState("$");
  const [data, setData] = useState(null);
  const amountImport = useSelector(valueAmount);
  const name = useSelector(valueUser);
  const dispatch = useDispatch()
  
 const mainBalance = initialBalance - amountImport
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

  const handleSubmit = (e) => {
    dispatch(saveBalance(mainBalance))
  }

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
            {roundOff(mainBalance)}
          </p>
        </div>

        <div className="convert">
          <p style={{ textAlign: "center" }}>CONVERT</p>
          <button
            className="btn"
            onClick={() => {
              setSign("$");
              setBalance(mainBalance);
            }}
          >
            ($)
          </button>
          <button
            className="btn"
            onClick={() => {
              setSign("\u20A6");
              setBalance(mainBalance * data.NGN);
            }}
          >
            (&#8358;)
          </button>
          <button
            className="btn"
            onClick={() => {
              setSign("\u20AC");
              setBalance(mainBalance * data.EUR);
            }}
          >
            (&euro;)
          </button>
        </div>
        <span class="mainbalance">
          {sign}
          {mainBalance}
        </span>
      </div>

      <div className="transferInitiation" style={{ paddingTop: "50px" }}>
        <p className="introText2">What would you like to do today?</p>
        
          <Link onClick={handleSubmit} style={{ textDecoration: "none" }} to="/Transfer">
           <div className="transferBox"> Transfer </div>
          </Link>
       
      </div>

      <div className="introText2" style={{ paddingTop: "30px" }}>
        Transaction history
      </div>
      <div className="history">
        <div className="historyCase">
          <p className="name">Credit from Ayo Abolaji</p>
          <p className="amount">$9000</p>
        </div>
        <div className="historyCase">
          <p className="name">Transfer to {name}</p>
          <p className="amount" style={{ color: "rgb(207, 5, 5)" }}>
           -${amountImport} 
          </p>
        </div>
       {/* {users.map((e)=>(
        <div className="historyCase">
          <p className="name">Transfer to Name</p>
          <p className="amount" style={{ color: "rgb(207, 5, 5)" }}>
            {amount}
          </p>
        </div>))}*/}
      </div>
    </div>
  );
}

export default Balance;
