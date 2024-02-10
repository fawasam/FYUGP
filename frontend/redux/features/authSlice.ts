"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  userInfo: Record<string, any>;
  userToken: string | null;
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
}

export const loadUserFromStorage = (): any | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return storedUser ? JSON.parse(storedUser) : null;
    } else {
      return null;
    }
  }
};

const initialState: AuthState = {
  userInfo: loadUserFromStorage(),
  isAuthenticated: Boolean(loadUserFromStorage()),
  userToken: loadUserFromStorage()?.token,
  error: null,
  success: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      state.userInfo = action.payload?.data?.user;
      state.isAuthenticated = !!action.payload;
      state.userToken = action.payload.token;
      state.success = !!action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state: any) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.userToken = null;
      state.success = false;
      localStorage.removeItem("user");
    },
  },
  //   extraReducers: {},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
