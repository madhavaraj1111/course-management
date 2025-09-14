import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import progressReducer from "./slices/progressSlice";
import uiReducer from "./slices/uiSlice";
import storageMiddleware from "./middleware/storageMiddleware";

const loadInitialState = () => {
  try {
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
      return {
        courses: {
          list: JSON.parse(savedCourses),
          selectedCourse: null,
        },
      };
    }
  } catch (error) {
    console.log("Error loading from localStorage:", error);
  }
  return undefined;
};
const store = configureStore({
  reducer: {
    courses: coursesReducer,
    progress: progressReducer,
    ui: uiReducer,
  },
  preloadedState: loadInitialState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware),
});

export default store;
