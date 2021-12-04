import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App() {
  return (
      <Router>
      <div className="App">
      <Routes>
       <Route exact path="/" element={<Balance/>}/>
       <Route exact path="/Transfer" element={<Transfer/>}/>
      </Routes>
      </div>
    </Router>

  );
}

export default App;


