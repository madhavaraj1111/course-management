import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedCourse: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    updateCourse: (state, action) => {
      const { index, updatedCourse } = action.payload;
      state.list[index] = updatedCourse;
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    deleteCourse: (state, action) => {
      state.list = state.list.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addCourse, updateCourse, selectCourse, deleteCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
