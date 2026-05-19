import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/Auth";
import userReducer from "../../utils/userSlice";
import { profileApi } from "../../components/profileApi";

export const store = configureStore({
  reducer: {

    authApi: authApi.reducer, 
    profileApi: profileApi.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(profileApi.middleware), 
});
