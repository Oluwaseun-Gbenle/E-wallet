import { createSlice } from "@reduxjs/toolkit";

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: "",
  reducers: {
    saveAppUser: (state, action) => action.payload
  }
});
export const { saveAppUser } = appUserSlice.actions
export const valueAppUser = (state) => state.appUser;
export default appUserSlice.reducer