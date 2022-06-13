import { configureStore } from "@reduxjs/toolkit";
import amountReducer from "../slices/amountSlice";
import balanceReducer from "../slices/balanceSlice";
import userReducer from "../slices/userSlice";
import amountBalanceReducer from "../slices/amountBalance";
import appUserReducer from "../slices/appUserSlice";

export const store = configureStore({
  reducer: {
    amount: amountReducer,
    balance: balanceReducer,
    user: userReducer,
    amountBalance : amountBalanceReducer,
    appUser : appUserReducer
  },
});