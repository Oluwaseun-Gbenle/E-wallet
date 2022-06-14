import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Balance.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { valueAmountBalance } from "../slices/amountBalance";
import { valueBalance } from "../slices/balanceSlice";
import { fetchData, fetchUsers, roundOff } from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";

function Balance() {
  const initialBalance = useSelector(valueBalance);
  const amountImport = useSelector(valueAmountBalance);
  const mainBalance = initialBalance - amountImport;
  const [sign, setSign] = useState("$");
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(mainBalance);
  const applicationUser = useSelector(valueAppUser);
  const navigate = useNavigate();
  roundOff();
  const transactionList = users.find(
    (i) => `${i.fname} ${i.lname}` == applicationUser
  );

  useEffect(() => {
    fetchData({ axios, setData });
    fetchUsers({ axios, setUsers });
    //initialBalance === 0 && navigate("/");
  }, [initialBalance]);

  console.log("creditList", transactionList);
  return (
    <div id="balance">
      <div className="intro">
        <h2 className="introText">Hi, {applicationUser}</h2>
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
            className="btn1"
            onClick={() => {
              setSign("$");
              setBalance(mainBalance);
            }}
          >
            ($)
          </button>
          <button
            className="btn1"
            onClick={() => {
              setSign("\u20A6");
              setBalance(mainBalance * data.NGN);
            }}
          >
            (&#8358;)
          </button>
          <button
            className="btn1"
            onClick={() => {
              setSign("\u20AC");
              setBalance(mainBalance * data.EUR);
            }}
          >
            (&euro;)
          </button>
        </div>
        <span className="mainbalance">
          {sign}
          {balance}
        </span>
      </div>

      <div className="transferInitiation">
        <p className="introText2">What would you like to do today?</p>

        <div
          onClick={() => {
            navigate("/Transfer");
          }}
        >
          <div className="transferBox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40px" height="40px"style={{ fill: "#ff7e3c" }}>
              <path d="M320 96H192L144.6 24.88C137.5 14.24 145.1 0 157.9 0H354.1C366.9 0 374.5 14.24 367.4 24.88L320 96zM192 128H320C323.8 130.5 328.1 133.3 332.1 136.4C389.7 172.7 512 250.9 512 416C512 469 469 512 416 512H96C42.98 512 0 469 0 416C0 250.9 122.3 172.7 179 136.4C183.9 133.3 188.2 130.5 192 128V128zM276.1 224C276.1 212.9 267.1 203.9 255.1 203.9C244.9 203.9 235.9 212.9 235.9 224V230C230.3 231.2 224.1 232.9 220 235.1C205.1 241.9 192.1 254.5 188.9 272.8C187.1 283 188.1 292.9 192.3 301.8C196.5 310.6 203 316.8 209.6 321.3C221.2 329.2 236.5 333.8 248.2 337.3L250.4 337.9C264.4 342.2 273.8 345.3 279.7 349.6C282.2 351.4 283.1 352.8 283.4 353.7C283.8 354.5 284.4 356.3 283.7 360.3C283.1 363.8 281.2 366.8 275.7 369.1C269.6 371.7 259.7 373 246.9 371C240.9 370 230.2 366.4 220.7 363.2C218.5 362.4 216.3 361.7 214.3 361C203.8 357.5 192.5 363.2 189 373.7C185.5 384.2 191.2 395.5 201.7 398.1C202.9 399.4 204.4 399.9 206.1 400.5C213.1 403.2 226.4 407.4 235.9 409.6V416C235.9 427.1 244.9 436.1 255.1 436.1C267.1 436.1 276.1 427.1 276.1 416V410.5C281.4 409.5 286.6 407.1 291.4 405.9C307.2 399.2 319.8 386.2 323.1 367.2C324.9 356.8 324.1 346.8 320.1 337.7C316.2 328.7 309.9 322.1 303.2 317.3C291.1 308.4 274.9 303.6 262.8 299.9L261.1 299.7C247.8 295.4 238.2 292.4 232.1 288.2C229.5 286.4 228.7 285.2 228.5 284.7C228.3 284.3 227.7 283.1 228.3 279.7C228.7 277.7 230.2 274.4 236.5 271.6C242.1 268.7 252.9 267.1 265.1 268.1C269.5 269.7 283 272.3 286.9 273.3C297.5 276.2 308.5 269.8 311.3 259.1C314.2 248.5 307.8 237.5 297.1 234.7C292.7 233.5 282.7 231.5 276.1 230.3L276.1 224z" />
            </svg>
          </div>
          <p className="transferLabel">Transfer</p>
        </div>
      </div>

      <div className="introText2">
        Transaction history
      </div>
      <div className="history">
        {transactionList?.amountReceived.map((received, id) => (
          <div className="historyCase">
            <p className="name">Credit from {received.sender}</p>
            <p className="amount">${received.amount}</p>
          </div>
        ))}

        {transactionList?.amountSent.map((sent, id) => (
          <div className="historyCase">
            <p className="name">Transfer to {sent.receiver}</p>
            <p className="amount" style={{ color: "rgb(207, 5, 5)" }}>
              -${sent.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Balance;
