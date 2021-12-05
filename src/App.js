import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Balance from "./Balance";
import Transfer from "./Transfer";
import Confirmation from "./Confirmation";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Balance />} />
          <Route
            exact
            path="/Transfer"
            element={<Transfer  />}
          />
          <Route
            exact
            path="/Confirmation"
            element={<Confirmation  />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
