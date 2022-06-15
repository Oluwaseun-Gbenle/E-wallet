import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import "font-awesome/css/font-awesome.min.css";
import LoadingStyle from "./loadingStyle";
import { fetchUsers } from "./async-function";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveAppUser } from "../slices/appUserSlice";

function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [exports, setExports] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers({ axios, setUsers });
  }, []);

  return (
    <>
     {users.length === 0 ? <LoadingStyle /> : 
      <div className="container">
        <div className="container2">
        <div className="login-container">
          <h2>LOGIN</h2>
          <div className="form">
            <div className="inputStyle">
              <div>
              <i className="fa fa-user" style={{ fontSize: 15 }}></i>
              </div>
                <select
                  className="input-box selection"
                  onChange={(e) => {
                    setExports(
                      e.target.selectedOptions[0].dataset.user,
                    );
                    setPassword(e.target.selectedOptions[0].dataset.tag);
                  }}
                >
                  <option disabled selected className="firstOption" value="">
                    Enter User Name
                  </option>{" "}
                  {users.map((user, idx) => (
                    <option
                      key={idx}
                      value={user.username}
                      data-tag={user.password}
                      data-user={user._id}
                    >
                      {user.username}
                    </option>
                  ))}
                </select>
            </div>
            <div className="inputStyle">
              <div>
              <i className="fa fa-lock" style={{ fontSize: 15 }}></i>
              </div>
                <input
                  className="input-box password"
                  value={password}
                  placeholder="Password"
                  readOnly
                />
            </div>
            <div>
              <button
                onClick={() => {
                  password && navigate("/Balance");
                  dispatch(saveAppUser(exports));
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
      }
    </>
  );
}

export default Login;
