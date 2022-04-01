import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";
import Confirmation from "./components/Confirmation";

const rootElement = document.getElementById("root");
render( 
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Balance />} />
    <Route path="Transfer" element={<Transfer />} />
    <Route path="Confirmation" element={<Confirmation amount/>} />
  </Routes>
</BrowserRouter>,
 rootElement);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

