import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";
import "./Balance.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { valueAmount } from "../slices/amountSlice";
import { valueUser } from "../slices/userSlice";
import {
  fetchData,
  fetchUsers,
  roundOff,
  updateAmount,
} from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";
import Modal from "./Modal";

function Confirmation() {
  const appUser = useSelector(valueAppUser);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [modal, setModal] = useState(false);
  const amountImport = useSelector(valueAmount);
  const name = useSelector(valueUser);
  const [amount, setAmount] = useState(amountImport);
  const [sign, setSign] = useState("$");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  roundOff();
    
  useEffect(() => {
    fetchData({ axios, setData });
    fetchUsers({ axios, setUsers });
  }, []);
  let receiverId = users
    .map((i) => `${i.fname} ${i.lname}` == name && i._id)
    .find((i) => i);
  let receiver = name;
  let senderId = users
    .map((i) => `${i.fname} ${i.lname}` == appUser && i._id)
    .find((i) => i);
  let sender = appUser;
  const payload = {
    senderId,
    receiverId,
    sender,
    receiver,
    walletbalance: amountImport,
  };
  console.log("response", response);
  return (
    <div id="confirmation">
      <div className="transferHeader">
        {modal && response != null ? <Modal res={response} /> : null}
        <div className="transferText1Box">
          <div className="back-icon" onClick={() => navigate("/Transfer")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="35px"
              height="35px"
              className="svg"
              fill="#ff7e3c"
            >
              <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
            </svg>
          </div>
          <div className="transferText1">Confirm Transfer</div>
        </div>
        <p className="transferText2">
          You are about to make an irreversible transaction
        </p>
      </div>
      <div className="display1">
        <div className="currencyArea">
          <div className="balanceText">YOU'RE ABOUT TO SEND</div>
          <h1 className="price">
            {sign}
            {roundOff(amount)}
          </h1>
          <span class="mainbalance">
            {sign}
            {amount}
          </span>
        </div>

        <div className="currencySelection">
        <div className="currencyText">CURRENCY</div>
          <div className="btns">
            <button className="btn" onClick={() => setAmount(amountImport)}>
              ($)
            </button>
            <button
              className="btn"
              onClick={() => {
                setSign("\u20A6");
                setAmount(amountImport * data.NGN);
              }}
            >
              (&#8358;)
            </button>
            <button
              className="btn"
              onClick={() => {
                setSign("\u20AC");
                setAmount(amountImport * data.EUR);
              }}
            >
              (&euro;)
            </button>
          </div>
        </div>
      </div>
      <div className="transferInitiation">
        <p className="introText2">To</p>
        <div className="transferBox" style={{ width: "200px", paddingTop: "20px", color:"#ff7e3c" }}>
          {name}
        </div>
      </div>
      <div className="sendCont">
        <div onClick={()=>{}} className="sendBtn">
          <div
            className="link"
            onClick={() => {
              updateAmount({setResponse, axios, payload });
              setModal(true);
            }}
          >
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
