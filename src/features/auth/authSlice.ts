import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: {
  token: string | null;
  name: string | null;
  role: string | null;
} = {
  token: null,
  name: null,
  role: null,
};

/**
 * Creates a Redux slice for managing authentication state.
 * @param {object} config - The configuration object for the slice.
 * @param {string} config.name - The name of the slice.
 * @param {object} config.initialState - The initial state of the slice.
 * @param {object} config.reducers - An object containing the reducer functions for the slice.
 * @param {function} config.reducers.setCredentials - The reducer function for setting the authentication credentials.
 * @param {function} config.reducers.logOut - The reducer function for logging out the user.
 * @returns {object} - The created Redux slice.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, name, role } = action.payload;
      state.token = token;
      state.role = role;
      state.name = name;
    },
    logOut: (state) => {
      state.token = null;
      state.role = null;
      state.name = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUserName = (state: RootState) => state.auth.name;
export const selectCurrentUserRole = (state: RootState) => state.auth.role;
