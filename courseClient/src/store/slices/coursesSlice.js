import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const { addCourse, selectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
