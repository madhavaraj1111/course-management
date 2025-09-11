import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedCourse: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.list = action.payload;
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    addCourse: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { setCourses, selectCourse, addCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
