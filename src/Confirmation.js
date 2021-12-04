import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";
import "./Balance.css";

function Confirmation() {

    
  return (
    <div className="confirmation">
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
          <h1 className="price">$ 4,000</h1>
        </div>

        <div className="currencySelection">
          <div className="currencyText">Select Your Currency</div>
          <div className="btns">
            <button className="btn">$</button>
            <button className="btn">₦</button>
            <button className="btn">€</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
