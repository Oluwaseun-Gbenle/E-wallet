import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";


function Transfer() {


    return (
   <div id= "transfer">
    <div className="transferHeader">
      <div className="transferText1Box">
        <div className="back-icon">
          <a href="/"><img
            className="arrow-1"
            src="ata:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAwYzYuNjIzIDAgMTIgNS4zNzcgMTIgMTJzLTUuMzc3IDEyLTEyIDEyLTEyLTUuMzc3LTEyLTEyIDUuMzc3LTEyIDEyLTEyem0wIDFjNi4wNzEgMCAxMSA0LjkyOSAxMSAxMXMtNC45MjkgMTEtMTEgMTEtMTEtNC45MjktMTEtMTEgNC45MjktMTEgMTEtMTF6bS00LjgyOCAxMS41bDQuNjA4IDMuNzYzLS42NzkuNzM3LTYuMTAxLTUgNi4xMTItNSAuNjY2Ljc1My00LjYwNCAzLjc0N2gxMS44MjZ2MWgtMTEuODI4eiIvPjwvc3ZnPg==" alt="arrow"
          /></a>
        </div>
        <div className="transferText1">Transfer</div>
      </div>
      <p class="text-1-1 avenir-medium-ship-gray-13px">
        Here, you can transfer money to anyone
      </p>
    </div>


    <div class="currency-area">
      <div class="balance-preview">
        <div class="your-balance-is avenir-medium-ship-gray-13px">
          Your Balance is
        </div>
        <h1 class="price-1">$ 349,000</h1>
      </div>
      <div class="currency-selection">
        <div class="text-2 avenir-medium-ship-gray-13px">Select Your Currency</div>
        <div class="form-conversions">
          <div class="form-dollars">
            <div class="form-dollar-price">$</div>
          </div>
          <div class="form-naira">
            <div class="form-naira-price">₦</div>
          </div>
          <div class="form-euro">
            <div class="form-euro-price">€</div>
          </div>
        </div>
      </div>
    </div>
    <div class="inputs">
      <div class="recipient-selection">
        <p class="text-3 avenir-medium-ship-gray-13px">
          Who would you like to send money to?
        </p>
        <div class="input">
            <div class="select-contact">Select Contact</div>
        </div>
      </div>
      <div class="amoubt-to-send">
        <p class="text-4 avenir-medium-ship-gray-13px">
          How much would you like to send?
        </p>
        <div class="input">
            <div class="select-amount">e.g $ 4,000</div>
        </div>
      </div>
    </div>
    <div class="form-button">
      <div class="button-base">
        <div class="button">Send</div>
      </div>
        </div>
        </div>
    )
}

export default Transfer
