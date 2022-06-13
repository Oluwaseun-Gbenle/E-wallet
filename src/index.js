import { render } from "react-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";
import Confirmation from "./components/Confirmation";

const rootElement = document.getElementById("root");
render( 

<BrowserRouter>
<Provider store={store}>
  <Routes>
  <Route path="/" element={<Login />} />
    <Route path="Balance" element={<Balance />} />
    <Route path="Transfer" element={<Transfer />} />
    <Route path="Confirmation" element={<Confirmation />} />
  </Routes>
  </Provider>
</BrowserRouter>,
 rootElement);





