import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import progressReducer from "./slices/progressSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import storageMiddleware from "./middleware/storageMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    progress: progressReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware),
});

export default store;