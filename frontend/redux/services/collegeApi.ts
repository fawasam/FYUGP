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
interface CreateProgramFormData {
  Dname: string;
  headOfDepartment: string;
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

    //department or program
    createProgram: builder.mutation<void, CreateProgramFormData>({
      query: (data) => ({
        url: "/program",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    updateProgram: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/program/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getAllProgram: builder.mutation<any, any>({
      query: (data) => ({
        url: "/program/all",
        method: "GET",
        headers: {},
      }),
    }),
    getAProgram: builder.mutation<any, any>({
      query: (id) => ({
        url: `/program/${id}`,
        method: "GET",
        headers: {},
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
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useGetAProgramMutation,
  useGetAllProgramMutation,
} = collegeApi;
