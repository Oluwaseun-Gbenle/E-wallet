import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Balance.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { valueAmountBalance } from "../slices/amountBalance";
import { valueBalance } from "../slices/balanceSlice";
import { saveBalance } from "../slices/balanceSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  roundOff();
  const transactionList = users.find((i) => `${i.fname} ${i.lname}` == applicationUser);
  

  useEffect(() => {
   fetchData({axios, setData});
   fetchUsers({axios, setUsers})
   initialBalance === 0 && navigate("/");
  }, [initialBalance]);
  
console.log("creditList", transactionList)
  return (
    <div id="balance">
      <div className="intro">
        <h2 className="introText">{applicationUser}</h2>
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
          <p style={{ textAlign: "center" }}>CONVERT</p>
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
              setBalance(mainBalance * data.NGN)
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

      <div className="transferInitiation" style={{ paddingTop: "50px" }}>
        <p className="introText2">What would you like to do today?</p>

        <Link
          onClick={()=> { dispatch(saveBalance(mainBalance));}}
          style={{ textDecoration: "none" }}
          to="/Transfer"
        >
          <div className="transferBox"> Transfer </div>
        </Link>
      </div>

      <div className="introText2" style={{ paddingTop: "30px" }}>
        Transaction history
      </div>
      <div className="history">
      {transactionList?.amountReceived.map((received,id)=>(
        <div className="historyCase">
          <p className="name">Credit from {received.sender}</p>
          <p className="amount">${received.amount}</p>
        </div>
        ))}

        {transactionList?.amountSent.map((sent,id)=>(
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
