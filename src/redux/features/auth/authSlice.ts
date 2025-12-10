
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null;
}

interface User {
  name?: string;
  email?: string;
  role?: "admin" | "user";   // 👈 role added
  [key: string]: any;
}



const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user?: any }>) => {
      state.token = action.payload.token;
      // If API does not provide role, default = user
      state.user = {
        role: action.payload.user?.role || "user",
        ...action.payload.user,
      } as User;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;