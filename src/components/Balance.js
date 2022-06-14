import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Balance.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { valueAmountBalance } from "../slices/amountBalance";
import { valueBalance } from "../slices/balanceSlice";
import { fetchData, fetchUsers, roundOff } from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";
import LoadingStyle from "./loadingStyle";

function Balance() {
  const mainBalance = useSelector(valueBalance);
  const [sign, setSign] = useState("$");
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(mainBalance);
  const applicationUser = useSelector(valueAppUser);
  const navigate = useNavigate();
  roundOff();
  const transactionList = users.find(
    (user) => `${user.fname} ${user.lname}` == applicationUser
  );

  useEffect(() => {
    fetchData({ axios, setData });
    fetchUsers({ axios, setUsers });
  }, [users]);

  return (
    <>
      {users.length === 0 ? (
        <LoadingStyle />
      ) : (
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  width="40px"
                  height="40px"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#ff7e3c"
                    stroke="none"
                    className="svg"
                  >
                    <path d="M812 4601 c-441 -278 -802 -509 -802 -512 0 -7 1150 -733 1153 -728 1 2 28 42 59 89 197 296 488 518 827 630 147 49 238 67 390 79 546 40 1077 -198 1409 -634 l23 -30 -4 175 c-4 153 -7 186 -30 261 -36 120 -68 188 -134 287 -165 248 -422 405 -723 442 -50 6 -343 10 -722 10 l-638 0 -2 218 -3 218 -803 -505z" />
                    <path d="M2449 3859 c-303 -25 -578 -151 -799 -365 -262 -254 -400 -578 -400 -938 0 -974 1012 -1607 1887 -1181 583 284 869 956 671 1579 -65 205 -176 383 -337 539 -175 170 -358 272 -592 331 -85 22 -133 28 -289 40 -25 2 -88 0 -141 -5z m251 -624 c0 -47 2 -85 4 -85 2 0 41 -7 86 -16 82 -15 202 -55 226 -74 9 -8 -2 -42 -43 -143 -31 -72 -57 -134 -59 -136 -2 -2 -35 8 -72 23 -187 73 -373 71 -397 -4 -14 -45 29 -68 202 -105 199 -43 266 -70 338 -136 109 -100 121 -281 30 -415 -55 -79 -176 -154 -275 -170 l-40 -7 0 -93 0 -94 -120 0 -120 0 0 89 0 88 -68 6 c-91 9 -213 41 -289 76 l-62 29 61 139 c33 76 62 139 63 141 2 2 25 -8 52 -21 87 -45 182 -69 293 -74 131 -7 180 8 180 55 0 44 -28 57 -216 102 -190 46 -276 83 -334 146 -59 64 -73 104 -74 209 -1 109 19 159 91 236 55 59 155 112 245 131 l58 12 0 88 0 88 120 0 120 0 0 -85z" />
                    <path d="M3891 1644 c-81 -123 -237 -285 -369 -384 -511 -384 -1208 -425 -1766 -104 -159 91 -349 255 -474 409 l-33 40 4 -170 c5 -195 21 -272 85 -409 56 -119 113 -199 211 -296 141 -140 308 -230 506 -271 83 -17 145 -19 768 -19 l677 0 0 -220 c0 -121 2 -220 4 -220 2 0 159 97 348 216 497 314 864 546 1013 639 72 45 158 100 193 122 l64 40 -54 33 c-29 18 -288 180 -574 361 -287 181 -525 329 -530 329 -5 0 -38 -43 -73 -96z" />
                  </g>
                </svg>
              </div>
              <p className="transferLabel">Transfer</p>
            </div>
          </div>

          <div className="introText2">Transaction history</div>
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
      )}
    </>
  );
}

export default Balance;
