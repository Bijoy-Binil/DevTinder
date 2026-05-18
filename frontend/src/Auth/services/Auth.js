import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
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
