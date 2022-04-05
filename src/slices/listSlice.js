import { createSlice } from "@reduxjs/toolkit";


export const listSlice = createSlice({
  name: "list",
  initialState : [],
  reducers: {
  savelist: (state, action) => {
    state.push(action.payload)
  }
}
});
export const { savelist } = listSlice.actions
export const selectList = (state) => state.list;
export default listSlice.reducer