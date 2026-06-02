
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
      // Optimistically drop the swiped user from the cached feed so the card
      // disappears instantly and never reappears after a remount/refetch.
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData("getFeed", undefined, (draft) => {
            const index = draft.findIndex((user) => user._id === userId);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetFeedQuery, useSendRequestMutation } = userApi;
