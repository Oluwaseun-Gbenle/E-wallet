import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Balance.css";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchData, fetchSingleUser, roundOff } from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";
import LoadingStyle from "./loadingStyle";

function Balance() {
  const [sign, setSign] = useState("$");
  const [data, setData] = useState(null);
  const [appUser, setAppUser] = useState({});
  const mainBalance = appUser.walletbalance;
  const [balance, setBalance] = useState(mainBalance);
  const appUserId = useSelector(valueAppUser);
  const navigate = useNavigate();
  roundOff();

  useEffect(() => {
    fetchData({ axios, setData });
    fetchSingleUser({ axios, setAppUser, appUserId });
    setBalance(mainBalance);
  }, [mainBalance]);

  return (
    <>
      {Object.keys(appUser).length === 0 ? (
        <LoadingStyle />
      ) : (
        <div id="balance">
          <div className="intro">
            <div className="transferText1Box1">
              <div className="back-icon1" onClick={() => navigate("/")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="25px"
                  height="25px"
                  className="svg"
                  fill="#ff7e3c"
                >
                  <path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM384 288H205.3l49.38 49.38c12.5 12.5 12.5 32.75 0 45.25s-32.75 12.5-45.25 0L105.4 278.6C97.4 270.7 96 260.9 96 256c0-4.883 1.391-14.66 9.398-22.65l103.1-103.1c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L205.3 224H384c17.69 0 32 14.33 32 32S401.7 288 384 288z" />
                </svg>
              </div>
              <h2 className="introText">
                Hi, {appUser.fname} {appUser.lname}
              </h2>
            </div>
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
              {mainBalance}
            </span>
          </div>

          <div className="transferInitiation">
            <p className="introText2">What would you like to do today?</p>

            <div>
              <div
                className="transferBox"
                onClick={() => {
                  navigate("/Transfer");
                }}
              >
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
            {appUser?.amountReceived.map((received, id) => (
              <div className="historyCase">
                <p className="name">Credit from {received.sender}</p>
                <p className="amount">${received.amount}</p>
              </div>
            ))}

            {appUser?.amountSent.map((sent, id) => (
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
