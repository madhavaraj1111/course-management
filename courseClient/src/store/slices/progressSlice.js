import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:5000/api";

export const markLessonComplete = createAsyncThunk(
  "progress/markComplete",
  async ({ courseId, sectionId, lessonId }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(
        `${API_BASE_URL}/courses/${courseId}/lessons/${sectionId}/${lessonId}/complete`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return { courseId, sectionId, lessonId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  completed: {}, // { courseId: [{ sectionId, lessonId }] }
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      state.completed[courseId] = progress;
    },
    clearProgress: (state, action) => {
      if (action.payload) {
        delete state.completed[action.payload];
      } else {
        state.completed = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markLessonComplete.pending, (state) => {
        state.loading = true;
      })
      .addCase(markLessonComplete.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId, sectionId, lessonId } = action.payload;
        
        if (!state.completed[courseId]) {
          state.completed[courseId] = [];
        }

        const exists = state.completed[courseId].some(
          (p) => p.sectionId === sectionId && p.lessonId === lessonId
        );

        if (!exists) {
          state.completed[courseId].push({ sectionId, lessonId });
        }
      })
      .addCase(markLessonComplete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProgress, clearProgress } = progressSlice.actions;
export default progressSlice.reducer;