import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  email: "",
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
  },
});
export const { setcurrentuser, setEmail } = userSlice.actions;
export default userSlice.reducer;
