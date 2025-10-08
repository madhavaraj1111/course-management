import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:5000/api";

// Async thunks
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async ({ viewMode, userRole, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint;

      switch (viewMode) {
        case "browse":
          endpoint = "/courses";
          break;
        case "enrolled":
          endpoint = "/student/dashboard";
          break;
        case "manage":
          endpoint = userRole === "admin" ? "/admin/courses" : "/courses";
          break;
        default:
          endpoint = "/courses";
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      if (viewMode === "enrolled") {
        return data.enrolledCourses.map((course) => ({
          ...course,
          isEnrolled: true,
        }));
      }

      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCourses = createAsyncThunk(
  "courses/deleteCourses",
  async (courseIds, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        courseIds.map((id) =>
          fetch(`${API_BASE_URL}/admin/courses/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      return courseIds;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const enrollCourse = createAsyncThunk(
  "courses/enrollCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Enrollment failed");

      return courseId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourses.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => !action.payload.includes(c._id));
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        const course = state.list.find((c) => c._id === action.payload);
        if (course) course.isEnrolled = true;
      });
  },
});

export const { clearError } = coursesSlice.actions;
export default coursesSlice.reducer;