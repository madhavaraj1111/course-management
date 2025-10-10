import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { markLessonComplete } from "./progressSlice";

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
      const response = await fetch(
        `${API_BASE_URL}/courses/${courseId}/enroll`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Enrollment failed");

      return courseId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/admin/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ courseId, courseData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/admin/courses/${courseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(courseData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (courseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  selectedCourse: null,
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
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markLessonComplete.fulfilled, (state, action) => {
        const { courseId, sectionId, lessonId } = action.payload;
        
        if (state.selectedCourse && state.selectedCourse._id === courseId) {
          if (!state.selectedCourse.progress) {
            state.selectedCourse.progress = [];
          }
          
          const exists = state.selectedCourse.progress.some(
            (p) => p.sectionId === sectionId && p.lessonId === lessonId
          );
          
          if (!exists) {
            state.selectedCourse.progress.push({ sectionId, lessonId });
          }
        }
      });
  },
});

export const { clearError } = coursesSlice.actions;
export default coursesSlice.reducer;