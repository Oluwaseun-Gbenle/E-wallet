import { createSlice } from "@reduxjs/toolkit";

export const amountBalanceSlice = createSlice({
  name: "amountBalance",
  initialState: 0,
  reducers: {
    saveAmountBalance: (state, action) => action.payload
  }
});
export const { saveAmountBalance } = amountBalanceSlice.actions
export const valueAmountBalance = (state) => state.amountBalance;
export default amountBalanceSlice.reducer