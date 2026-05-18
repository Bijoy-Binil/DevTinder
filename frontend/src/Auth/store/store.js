import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/Auth";
import  userReducer  from "../../utils/userSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});