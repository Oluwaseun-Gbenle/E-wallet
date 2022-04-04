import { createSlice } from "@reduxjs/toolkit";

export const amountSlice = createSlice({
  name: "amount",
  initialState: 0,
  reducers: {
    saveAmount: (state, action) => action.payload
  }
});
export const { saveAmount } = amountSlice.actions
export const valueAmount = (state) => state.amount;
export default amountSlice.reducer