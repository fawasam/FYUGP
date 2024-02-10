import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterFormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  // loading: boolean;
  // userInfo: Record<string, any>;
  // userToken: string | null;
  // error: string | null;
  // success: boolean;
}
interface LoginFormData {
  email: string;
  password: string;
}
interface ForgotPasswordFormData {
  email: string;
}
interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/auth" }), // Adjust the base URL accordingly
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterFormData>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<void, LoginFormData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPasswordFormData>({
      query: (data) => ({
        url: "/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordFormData>({
      query: (data) => ({
        url: `/resetPassword/${data.token}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
