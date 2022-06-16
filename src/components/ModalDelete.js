import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import axios from "axios";
import { deleteTransaction } from "./async-function";
import { useSelector } from "react-redux";
import { valueAppUser } from "../slices/appUserSlice";

function ModalDelete() {
  const navigate = useNavigate();
  const userId = useSelector(valueAppUser);
  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div>
            <h2 className="text">Do you want to delete</h2>
            <h2 className="text">transaction history?</h2>
            <div className="btnContainer">
              <button
                className="yesButton"
                onClick={() => {
                  setTimeout(() => {
                    navigate(0);
                  }, 2000);
                  deleteTransaction({ axios, userId });
                }}
              >
                Yes
              </button>{" "}
              <button className="noButton" onClick={() => navigate(0)}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDelete;
