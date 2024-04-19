import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUserFromStorage } from "../features/authSlice";

export const enquiryApi = createApi({
  reducerPath: "enquiryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/enquiry`,
  }),
  endpoints: (builder) => ({
    createEnquiry: builder.mutation<void, any>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    getAllEnquiry: builder.mutation<void, any>({
      query: () => ({
        url: "/all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getAllNewEnquiry: builder.mutation<void, any>({
      query: () => ({
        url: "/new",
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getEnquiry: builder.mutation<void, any>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    readEnquiry: builder.mutation<void, any>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    deleteEnquiry: builder.mutation<void, any>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useGetAllEnquiryMutation,
  useGetEnquiryMutation,
  useReadEnquiryMutation,
  useDeleteEnquiryMutation,
  useGetAllNewEnquiryMutation,
} = enquiryApi;
