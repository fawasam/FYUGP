import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUserFromStorage } from "../features/authSlice";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/booking`,
  }),
  endpoints: (builder) => ({
    createBooking: builder.mutation<void, any>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    getAllBookingByAdvisors: builder.mutation<void, any>({
      query: ({ id: advisorId }) => ({
        url: `/${advisorId}/all`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getCommunityQns: builder.mutation<void, any>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingByAdvisorsMutation,
  useGetCommunityQnsMutation,
} = bookingApi;
