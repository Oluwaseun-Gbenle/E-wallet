import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function Modal({ res }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="overlay">
        <div className="modal">
          {res == 200 ? (
            <div>
              <div
                className="modal-image"
                style={{ boxShadow: "0 0 0 2px #48DB71" }}
              >
                <svg viewBox="0 0 32 32" style={{ fill: "#48DB71" }}>
                  <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z"></path>
                </svg>
              </div>
              <h2 className="text">Transaction successful</h2>
            </div>
          ) : (
            <div>
              <div
                className="modal-image"
                style={{ boxShadow: "0 0 0 2px #ec0101" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32px"
                  viewBox="0 0 329.26933 329"
                  width="38px"
                  style={{ fill: "#ec0101" }}
                >
                  <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                </svg>
              </div>
              <h2 className="text">Oops! An Error Occured </h2>
              <h2 className="text">Please Try Again</h2>
            </div>
          )}
          <button
            className="close"
            onClick={() => {
              res == 200 ?  navigate("/Balance") : navigate(-1)
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
