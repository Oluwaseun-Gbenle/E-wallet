import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import amountReducer from "../slices/amountSlice";
import userReducer from "../slices/userSlice";
import appUserReducer from "../slices/appUserSlice";

const reducers = combineReducers({
  amount: amountReducer,
  user: userReducer,
  appUser: appUserReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
