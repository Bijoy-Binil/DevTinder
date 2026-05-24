
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";


export const userApi = createApi({
 reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    getFeed: builder.query({
      query: () => '/user/feed',
    }),
  }),
});

export const { useGetFeedQuery } = userApi;
