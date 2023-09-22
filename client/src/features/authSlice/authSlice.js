import { createSlice } from "@reduxjs/toolkit";

const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
const initialState = {
  user: loggedInUser ? loggedInUser.user : null,
  isAuthenticated: loggedInUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser: (state, action) => {
      localStorage.clear();
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

// const user = useSelector((state) => state.auth.isAuthenticated);
