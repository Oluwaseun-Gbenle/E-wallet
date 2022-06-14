import { render } from "react-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";
import Confirmation from "./components/Confirmation";

let persistor = persistStore(store);
const rootElement = document.getElementById("root");
render( 

<BrowserRouter>
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
  <Routes>
  <Route path="/" element={<Login />} />
    <Route path="Balance" element={<Balance />} />
    <Route path="Transfer" element={<Transfer />} />
    <Route path="Confirmation" element={<Confirmation />} />
  </Routes>
  </PersistGate>
  </Provider>
</BrowserRouter>,
 rootElement);





