
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
      query: () => '/profile/view',
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
