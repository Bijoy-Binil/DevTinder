import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => {
        console.log(userData);

        return {
          url: "/login",
          method: "POST",
          body: userData,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
