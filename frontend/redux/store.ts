"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "@/redux/features/authSlice";
import collegeReducer from "@/redux/features/collegeSlice";
import { collegeApi } from "./services/collegeApi";
import { authApi } from "./services/authApi";
import { userApi } from "./services/userApi";
import { enquiryApi } from "./services/enquiryApi";
import { bookingApi } from "./services/bookingApi";
import { communityApi } from "./services/communityApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [collegeApi.reducerPath]: collegeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [enquiryApi.reducerPath]: enquiryApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
    auth: authReducer,
    college: collegeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      collegeApi.middleware,
      authApi.middleware,
      userApi.middleware,
      enquiryApi.middleware,
      bookingApi.middleware,
      communityApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
