import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
  };

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
  savelist: (state, action) => {
    state.items = [...state.items, action.payload];
  }
}
});
export const { savelist } = listSlice.actions
export const selectList = (state) => state.list.items;
export default listSlice.reducer