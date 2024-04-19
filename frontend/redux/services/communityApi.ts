import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUserFromStorage } from "../features/authSlice";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/community`,
  }),
  endpoints: (builder) => ({
    createQns: builder.mutation<void, any>({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    createQnsComment: builder.mutation<void, any>({
      query: ({ data, id }) => ({
        url: `/${id}/comment`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    getAllCommunityQns: builder.mutation<void, any>({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    getCommunityQns: builder.mutation<void, any>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateQnsMutation,
  useGetAllCommunityQnsMutation,
  useGetCommunityQnsMutation,
  useCreateQnsCommentMutation,
} = communityApi;
