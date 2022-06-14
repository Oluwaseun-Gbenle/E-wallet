import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import amountReducer from "../slices/amountSlice";
import balanceReducer from "../slices/balanceSlice";
import userReducer from "../slices/userSlice";
import amountBalanceReducer from "../slices/amountBalance";
import appUserReducer from "../slices/appUserSlice";

const reducers = combineReducers({
  amount: amountReducer,
  balance: balanceReducer,
  user: userReducer,
  amountBalance: amountBalanceReducer,
  appUser: appUserReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
