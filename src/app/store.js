import { configureStore } from "@reduxjs/toolkit";
import amountReducer from "../slices/amountSlice";
import balanceReducer from "../slices/balanceSlice";
import listReducer from "../slices/listSlice"
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    amount: amountReducer,
    balance: balanceReducer,
    user: userReducer,
    list: listReducer
  },
});