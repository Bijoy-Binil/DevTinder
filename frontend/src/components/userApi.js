
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
    sendRequest: builder.mutation({
      query: ({ status, userId }) => ({
        url: `/request/send/${status}/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetFeedQuery, useSendRequestMutation } = userApi;
