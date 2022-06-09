import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import "font-awesome/css/font-awesome.min.css";
import LoadingStyle from "./spinner";
import { fetchUsers } from "./async-function";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAppUser } from "../slices/appUserSlice";
import { saveUser } from "../slices/userSlice";
import { saveBalance } from "../slices/balanceSlice";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [exports, setExports] = useState({ name: "", balance: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers({ axios, setUsers });
  }, []);

  return (
    <>
     {users.length === 0 ? <LoadingStyle /> : 
      <div className="container">
        <div className="login-container">
          <h3>LOGIN</h3>
          <div className="form">
            <div>
              <i className="fa fa-user" style={{ fontSize: 15 }}>
                <select
                  className="input-box"
                  onChange={(e) => {
                    setExports({
                      name: e.target.selectedOptions[0].dataset.user,
                      balance: e.target.selectedOptions[0].dataset.balance,
                    });
                    setPassword(e.target.selectedOptions[0].dataset.tag);
                  }}
                >
                  <option disabled selected className="firstOption" value="">
                    Enter User Name
                  </option>{" "}
                  {users.map((d, idx) => (
                    <option
                      key={idx}
                      value={d.username}
                      data-tag={d.password}
                      data-user={`${d.fname} ${d.lname}`}
                      data-balance={d.walletbalance}
                    >
                      {d.username}
                    </option>
                  ))}
                </select>
              </i>
            </div>
            <div>
              <i className="fa fa-lock" style={{ fontSize: 15 }}></i>
              <div>
                <input
                  className="input-box password"
                  value={password}
                  placeholder="Password"
                  readOnly
                />
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  password && navigate("/Balance");
                  dispatch(saveAppUser(exports.name));
                  dispatch(saveBalance(exports.balance));
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}

export default Login;
