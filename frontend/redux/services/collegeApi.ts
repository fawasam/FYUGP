import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loadUserFromStorage } from "../features/authSlice";

interface CreateCollegeFormData {
  collegename: string;
  place: string;
  email: string;
  pincode?: string;
  phone?: string;
  picture?: string;
}

export const collegeApi = createApi({
  reducerPath: "collegeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/college`,
  }),
  endpoints: (builder) => ({
    createCollege: builder.mutation<void, CreateCollegeFormData>({
      query: (data) => ({
        url: "/create-college",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getAllCollege: builder.mutation<any, any>({
      query: (data) => ({
        url: "",
        method: "GET",
        headers: {},
      }),
    }),
    getACollege: builder.mutation<any, any>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
        headers: {},
      }),
    }),
    searchCollege: builder.mutation<any, any>({
      query: (searchKey) => ({
        url: `/search/${searchKey}`,
        method: "GET",
        headers: {},
      }),
    }),
    updateCollege: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/update-college/${id}`,
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
  useCreateCollegeMutation,
  useGetAllCollegeMutation,
  useSearchCollegeMutation,
  useGetACollegeMutation,
  useUpdateCollegeMutation,
} = collegeApi;
