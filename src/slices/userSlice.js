import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    saveUser: (state, action) => action.payload
  }
});
export const { saveUser } = userSlice.actions
export const valueUser = (state) => state.user;
export default userSlice.reducer