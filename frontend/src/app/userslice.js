import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  email: "",
  controller: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setcurrentuser: (state, action) => {
      state.currentUser = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setController: (state, action) => {
      state.controller = true;
    },
  },
});
export const { setcurrentuser, setEmail, setController } = userSlice.actions;
export default userSlice.reducer;
