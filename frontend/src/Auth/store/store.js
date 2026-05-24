import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/Auth";
import userReducer from "../../utils/userSlice";
import feedReducer from "../../utils/feedSlice";
import { profileApi } from "../../components/profileApi";
import { userApi } from "../../components/userApi";

export const store = configureStore({
  reducer: {

    authApi: authApi.reducer, 
    profileApi: profileApi.reducer,
    userApi: userApi.reducer,
    user: userReducer,
    feed: feedReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(profileApi.middleware)
      .concat(userApi.middleware), 
});
