import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:5000/api";

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      return { token: data.token, user: data.user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password, role = "student" }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDashboard = createAsyncThunk(
  "auth/fetchDashboard",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const endpoint = auth.user?.role === "admin" ? "/admin/dashboard" : "/student/dashboard";
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAdminCourses = createAsyncThunk(
  "auth/fetchAdminCourses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/admin/courses`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Helper to decode JWT
const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) return null;
    return {
      id: payload.userId,
      username: payload.username,
      role: payload.role,
      email: payload.email,
    };
  } catch {
    return null;
  }
};

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
  error: null,
  dashboardData: null,
  adminCourses: [],
};

// Initialize user from token
if (initialState.token) {
  initialState.user = decodeToken(initialState.token);
  if (!initialState.user) {
    localStorage.removeItem("token");
    initialState.token = null;
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.dashboardData = null;
      state.adminCourses = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Dashboard
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.adminCourses = action.payload;
      });
  },
});

export const { logout, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;