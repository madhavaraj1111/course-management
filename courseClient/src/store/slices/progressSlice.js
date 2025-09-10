import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completed: {},
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    markComplete: (state, action) => {
      const { courseId, lessonId } = action.payload;
      if (!state.completed[courseId]) {
        state.completed[courseId] = [];
      }

      if (!state.completed[courseId].includes(lessonId)) {
        state.completed[courseId].push(lessonId);
      }
    },
  },
});

export const { markComplete } = progressSlice.actions;
export default progressSlice.reducer;
