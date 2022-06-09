import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";
import "./Balance.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { valueAmount } from "../slices/amountSlice";
import { userSlice, valueUser } from "../slices/userSlice";
import { savelist } from "../slices/listSlice";
import { saveAmountBalance } from "../slices/amountBalance";
import { fetchData, fetchUsers, roundOff, updateAmount } from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";

function Confirmation() {
  const appUser = useSelector(valueAppUser)
  const [users, setUsers] = useState([]);
  const [data, setData] = useState(null);
  const amountImport = useSelector(valueAmount);
  const name = useSelector(valueUser);
  const [amount, setAmount] = useState(amountImport);
  const [sign, setSign] = useState("$");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  roundOff();

  const addList = () => {
    const structure = { amountImport, name };
    dispatch(savelist(structure));
    dispatch(saveAmountBalance(amountImport));
  };

  useEffect(() => {
    fetchData({ axios, setData });
    fetchUsers({ axios, setUsers });
    amountImport === 0 && navigate("/");
  }, []);
  let receiver = users
    .map((i) => `${i.fname} ${i.lname}` == name && i._id)
    .find((i) => i);
let sender = users
.map((i) => `${i.fname} ${i.lname}` == appUser && i._id)
.find((i) => i);
  const payload = {
      senderId: sender,
    receiverId: receiver,
    amount: amountImport,
  };
  updateAmount({axios,payload})
  return (
    <div id="confirmation">
      <div className="transferHeader">
        <div className="transferText1Box">
          <div className="back-icon">
            <div onClick={() => navigate(-1)}>
              <img
                className="arrow-1"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEyem0wIDFjNi4wNzEgMCAxMSA0LjkyOSAxMSAxMXMtNC45MjkgMTEtMTEgMTEtMTEtNC45MjktMTEtMTEgNC45MjktMTEgMTEtMTF6bS00LjgyOCAxMS41bDQuNjA4IDMuNzYzLS42NzkuNzM3LTYuMTAxLTUgNi4xMTItNSAuNjY2Ljc1My00LjYwNCAzLjc0N2gxMS44MjZ2MWgtMTEuODI4eiIvPjwvc3ZnPg=="
                alt="arrow"
              />
            </div>
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
          <span class="mainbalance">
            {sign}
            {amount}
          </span>
        </div>

        <div className="currencySelection">
          <div className="btns" style={{ marginTop: "33px" }}>
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
      <div className="transferInitiation" style={{ paddingTop: "50px" }}>
        <p className="introText2">To</p>
        <div className="transferBox" style={{ width: "200px" }}>
          {name}
        </div>
      </div>
      <div className="sendCont">
        <div onClick={addList} className="sendBtn">
          <div
            className="link"
            onClick={() => {
              navigate("/Balance");
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
