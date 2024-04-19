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
    getAllUsers: builder.mutation<void, any>({
      query: (data) => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getMe: builder.mutation<void, any>({
      query: () => ({
        url: "/user/getMe",
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    deleteUser: builder.mutation<void, { id: any }>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
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
    activeUser: builder.mutation<void, { id: any }>({
      query: ({ id }) => ({
        url: `/user/${id}/active`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getCount: builder.mutation<void, void>({
      query: () => ({
        url: `/count`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdatePasswordMutation,
  useGetAllUsersMutation,
  useUpdateMeMutation,
  useGetMeMutation,
  useDeleteUserMutation,
  useActiveUserMutation,
  useGetCountMutation,
} = userApi;
