import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile/view",
      providesTags: ["Profile"],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/edit",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getConnections: builder.query({
      query: () => ({
        url: "/user/connections",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetConnectionsQuery,
  useEditProfileMutation,
} = profileApi;
