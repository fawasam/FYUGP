import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUserFromStorage } from "../features/authSlice";

interface updatePasswordFormData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
interface getAllUsersFormData {
  password: string;
  confirmPassword: string;
  token: string;
}
interface updateMeFormData {
  fullname?: string;
  bio?: string;
  profileImage?: string;
}
interface getMeFormData {
  password: string;
  confirmPassword: string;
  token: string;
}
interface deleteMeFormData {}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
  }),
  endpoints: (builder) => ({
    updatePassword: builder.mutation<void, updatePasswordFormData>({
      query: (data) => ({
        url: "/user/updatePassword",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getAllUsers: builder.mutation<void, getAllUsersFormData>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getMe: builder.mutation<void, getMeFormData>({
      query: () => ({
        url: "/user/getMe",
        method: "GET",
      }),
    }),
    deleteMe: builder.mutation<void, deleteMeFormData>({
      query: () => ({
        url: "/user/deleteMe",
        method: "GET",
      }),
    }),
    updateMe: builder.mutation<void, updateMeFormData>({
      query: (data) => ({
        url: "/user/updateMe",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetAllUsersMutation,
  useUpdateMeMutation,
  useGetMeMutation,
  useDeleteMeMutation,
} = userApi;