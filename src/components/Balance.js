import React, { useEffect, useState } from "react";
import List from "./List";
import axios from "axios";
import "./Balance.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { valueAmountBalance } from "../slices/amountBalance";
import { valueBalance } from "../slices/balanceSlice";
import { saveBalance } from "../slices/balanceSlice";
import { selectList } from "../slices/listSlice";
import { fetchData, roundOff } from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";


function Balance() {
  const list = useSelector(selectList);
  const initialBalance = useSelector(valueBalance);
  const amountImport = useSelector(valueAmountBalance);
  const mainBalance = initialBalance - amountImport;
  const [sign, setSign] = useState("$");
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState(mainBalance);
  const applicationUser = useSelector(valueAppUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  roundOff();

  useEffect(() => {
   fetchData({axios, setData});
   initialBalance === 0 && navigate("/");
  }, []);

  
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
        <div className="historyCase">
          <p className="name">Credit from Ayo Abolaji</p>
          <p className="amount">$9000</p>
        </div>
        {list.map((e, i) => (
         <List 
          key={i}
          newName={e.name}
          amount={e.amountImport}
          />
        ))}
      </div>
    </div>
  );
}

export default Balance;
