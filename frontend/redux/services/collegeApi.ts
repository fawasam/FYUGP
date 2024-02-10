import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateCollegeFormData {
  collegename: string;
  place: string;
  pincode: number;
  phone: number;
}

export const collegeApi = createApi({
  reducerPath: "collegeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/college",
  }),
  endpoints: (builder) => ({
    createCollege: builder.mutation<void, CreateCollegeFormData>({
      query: (data) => ({
        url: "/create-college",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateCollegeMutation } = collegeApi;
