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
      query: () => ({
        url: "",
        method: "GET",
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
    updateCollege: builder.mutation<any, { id: any; data: any }>({
      query: ({ id, data }) => ({
        url: `/update-college/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    publishCollege: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/publish`,
        method: "POST",
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
    getAllProgramByCollege: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/program/all/${id}`,
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
    deleteProgram: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/program/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    //courses
    createCourse: builder.mutation<void, { programId: string; data: any }>({
      query: ({ programId, data }) => ({
        url: `/program/course/${programId}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    updateCourse: builder.mutation<
      any,
      { programId: string; courseId: string; data: any }
    >({
      query: ({ programId, courseId, data }) => ({
        url: `/program/course/${programId}/${courseId}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getAllCourse: builder.mutation<any, any>({
      query: (data) => ({
        url: "/program/course/all-course",
        method: "GET",
        headers: {},
      }),
    }),
    getAllCourseByProgram: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/program/course/all/${id}`,
        method: "GET",
        headers: {},
      }),
    }),
    getACourse: builder.mutation<any, any>({
      query: (id) => ({
        url: `/program/course/${id}`,
        method: "GET",
        headers: {},
      }),
    }),
    deleteCourse: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/program/course/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    //advisor
    createAdvisor: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: `/advisor`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    updateAdvisor: builder.mutation<void, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/advisor/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    getAllAdvisor: builder.mutation<void, void>({
      query: () => ({
        url: `/advisor/all`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    getAdvisor: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/advisor/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),
    deleteAdvisor: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/advisor/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${loadUserFromStorage().token}`,
        },
      }),
    }),

    getAllAdvisorByCollege: builder.mutation<any, { collegeId: string }>({
      query: ({ collegeId }) => ({
        url: `/advisor/${collegeId}/all/`,
        method: "GET",
        headers: {},
      }),
    }),

    changeAvailabilityOfAdvisor: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/advisor/${id}/available`,
        method: "POST",
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
  usePublishCollegeMutation,

  useCreateProgramMutation,
  useUpdateProgramMutation,
  useGetAProgramMutation,
  useGetAllProgramMutation,
  useGetAllProgramByCollegeMutation,
  useDeleteProgramMutation,

  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetACourseMutation,
  useGetAllCourseMutation,
  useGetAllCourseByProgramMutation,
  useDeleteCourseMutation,

  useCreateAdvisorMutation,
  useUpdateAdvisorMutation,
  useGetAdvisorMutation,
  useGetAllAdvisorMutation,
  useGetAllAdvisorByCollegeMutation,
  useDeleteAdvisorMutation,
  useChangeAvailabilityOfAdvisorMutation,
} = collegeApi;
