import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "../pages/Dashboard";
import CourseList from "../components/course-list/CourseList.jsx";
import CourseDetail from "../components/course-detail/CourseDetail.jsx";
import CourseCreate from "../pages/CourseCreate.jsx";
import CourseUpdate from "../pages/CourseUpdate.jsx";
import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/SignUp.jsx";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout.jsx";
import AskAI from "../pages/AskAI.jsx";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Dashboard Router - routes to correct dashboard based on role
const DashboardRouter = () => {
  const { user } = useAuth();

  return <Dashboard userRole={user?.role} />;
};

// Course Browse Router - handles student course browsing
const CourseBrowseRouter = () => {
  const { user } = useAuth();

  if (user?.role === "student") {
    return <CourseList viewMode="browse" />;
  }

  return <CourseList viewMode="manage" />;
};

const AppRoutes = () => {
  return (
    <Router>
      {/* // Simplified route structure that matches your API */}
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardRouter />} />

          {/* Admin routes */}
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute requiredRole="admin">
                <CourseList viewMode="manage" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses/create"
            element={
              <ProtectedRoute requiredRole="admin">
                <CourseCreate />
              </ProtectedRoute>
            }
            
          />
          <Route
            path="/admin/courses/:courseId/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <CourseUpdate />
              </ProtectedRoute>
            }
          />

          {/* Student routes */}
          <Route path="/courses" element={<CourseList viewMode="browse" />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute requiredRole="student">
                <CourseList viewMode="enrolled" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask-ai"
            element={
              <ProtectedRoute requiredRole="student">
                <AskAI />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;