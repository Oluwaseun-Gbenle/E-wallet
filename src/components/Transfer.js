import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transfer.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAmount } from "../slices/amountSlice";
import { saveUser } from "../slices/userSlice";
import { valueBalance } from "../slices/balanceSlice";
import { fetchData, fetchUsers, roundOff } from "./async-function";
import { valueAppUser } from "../slices/appUserSlice";
import LoadingStyle from "./loadingStyle";
import { Formik } from "formik";
import * as Yup from "yup";

function Transfer() {
  const mainBalance = useSelector(valueBalance);
  const appUser = useSelector(valueAppUser);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState("USD");
  const [balance, setBalance] = useState(mainBalance);
  const [sign, setSign] = useState("$");
  const navigate = useNavigate();
  roundOff();

  const schema = Yup.object().shape({
    inputName: Yup.string().required("Name is required"),
    inputAmount: Yup.number()
      .min(1, "Amount shouldn't be less than 1")
      .required("Amount is required"),
  });

  useEffect(() => {
    fetchData({ axios, setData });
    fetchUsers({ axios, setUsers });
  }, []);

  return (
    <>
      {users.length === 0 ? (
        <LoadingStyle />
      ) : (
        <div className="transferContainer">
          <div id="transfer">
            <div className="transferHeader">
              <div className="transferText1Box">
                <div className="back-icon" onClick={() => navigate("/Balance")}>
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
                <div className="transferText1"> Transfer</div>
              </div>
              <div className="transferText2">
                Here, you can transfer money to anyone.
              </div>
            </div>
            <Formik
              initialValues={{
                inputName: "",
                inputAmount: 0,
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                navigate("/Confirmation");
                dispatch(saveAmount(values.inputAmount));
                dispatch(saveUser(values.inputName));
              }}
            >
              {({ handleSubmit, setFieldValue, touched, errors, values }) => (
                <div>
                  <div className="displayContainer">
                    <div className="display1">
                      <div className="currencyArea">
                        <div className="balanceText">BALANCE</div>
                        <h1 className="price">
                          {sign}
                          {roundOff(balance)}
                        </h1>
                        <span className="mainbalance">
                          {sign}
                          {balance}
                        </span>
                      </div>

                      <div className="currencySelection">
                        <div className="currencyText">CURRENCY</div>
                        <div className="btns">
                          <button
                            className="btn"
                            onClick={() => {
                              setSign("$");
                              setBalance(mainBalance);
                            }}
                          >
                            ($)
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              setSign("\u20A6");
                              setBalance(mainBalance * data.NGN);
                            }}
                          >
                            (&#8358;)
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              setSign("\u20AC");
                              setBalance(mainBalance * data.EUR);
                            }}
                          >
                            (&euro;)
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="display2">
                      <div className="form2">
                        <p className="inputText1">
                          Who would you like to send money to?
                        </p>
                        {errors.inputName && touched.inputName ? (
                          <div style={{ color: "red" }}>{errors.inputName}</div>
                        ) : null}
                        <select
                          name="inputName"
                          className="input"
                          onChange={(event) => {
                            setFieldValue("inputName", event.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select your option
                          </option>
                          {users
                            .filter(
                              (user) => `${user.fname} ${user.lname}` != appUser
                            )
                            .map((user, idx) => (
                              <option
                                key={idx}
                                value={`${user.fname} ${user.lname}`}
                              >
                                {user.fname} {user.lname}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form2">
                        <p className="inputText2">
                          How much would you like to send?
                        </p>
                        {errors.inputAmount && touched.inputAmount ? (
                          <div style={{ color: "red" }}>
                            {errors.inputAmount}
                          </div>
                        ) : null}
                        <input
                          className="input2"
                          type="number"
                          name="inputAmount"
                          list="amount"
                          placeholder="e.g $4,000"
                          defaultValue={values.inputAmount}
                          onChange={(event) => {
                            setFieldValue("inputAmount", event.target.value);
                          }}
                        />
                        <select
                          id="amount"
                          onChange={(event) => setSelect(event.target.value)}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="NGN">NGN</option>
                        </select>
                        <p style={{ marginTop: "10px" }}>
                          {select == "EUR"
                            ? "\u20AC" + values.inputAmount * data.EUR
                            : select == "NGN"
                            ? "\u20A6" + values.inputAmount * data.NGN
                            : "$" + values.inputAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="sendCont">
                    <div
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="sendBtn"
                    >
                      <div>Send</div>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default Transfer;
