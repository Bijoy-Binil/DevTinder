import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile/view",
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/edit",
        method: "PATCH",
        body: data,
      }),
    }),
    getConnections: builder.query({
      query: () => ({
        url: "/user/connections",
      }),
    }),
    getRequest: builder.query({
      query: () => ({
        url: `/user/requests/received`,
      }),
    }),
    reviewRequest: builder.mutation({
      query: ({status, requestId}) => ({
        url: `/request/review/${status}/${requestId}`,
        method:"POST"
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetConnectionsQuery,
  useGetRequestQuery,
  useReviewRequestMutation,
  useEditProfileMutation,
} = profileApi;
