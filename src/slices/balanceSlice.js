import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: "balance",
  initialState: 391675,
  reducers: {
    saveBalance: (state, action) => action.payload
  }
});
export const { saveBalance } = balanceSlice.actions
export const valueBalance = (state) => state.balance;
export default balanceSlice.reducer