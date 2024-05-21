import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUserFromStorage } from "../features/authSlice";

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

interface GenerateCollegeCredentialsFormData {
  email: string;
}
interface GenerateAdvisorCredentialsFormData {
  fullname: string;
  user: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterFormData>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    generateCollegeCredentials: builder.mutation<
      void,
      GenerateCollegeCredentialsFormData
    >({
      query: (data) => ({
        url: "/signup/college",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage()?.token}`,
        },
      }),
    }),

    generateDepartmentCredentials: builder.mutation<
      void,
      GenerateCollegeCredentialsFormData
    >({
      query: (data) => ({
        url: "/signup/department",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage()?.token}`,
        },
      }),
    }),

    generateAdvisorCredentials: builder.mutation<void, any>({
      query: (data) => ({
        url: "/signup/advisor",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage()?.token}`,
        },
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
        url: `/resetPassword/${data?.token}`,
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
  useGenerateCollegeCredentialsMutation,
  useGenerateDepartmentCredentialsMutation,
  useGenerateAdvisorCredentialsMutation,
} = authApi;
