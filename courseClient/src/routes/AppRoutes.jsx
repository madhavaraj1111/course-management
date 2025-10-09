import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectAuthLoading } from "../store/selectors";
import ErrorBoundary from "../components/ErrorBoundary";

import Login from "../components/auth/Login.jsx";
import Signup from "../components/auth/SignUp.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const CourseList = lazy(() => import("../components/course-list/CourseList.jsx"));
const CourseDetail = lazy(() => import("../components/course-detail/CourseDetail.jsx"));
const CourseCreate = lazy(() => import("../pages/CourseCreate.jsx"));
const CourseUpdate = lazy(() => import("../pages/CourseUpdate.jsx"));
const AskAI = lazy(() => import("../pages/AskAI.jsx"));
const NotFound = lazy(() => import("../pages/NotFound"));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;

  return children;
};

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />

              <Route path="/admin/courses" element={<ProtectedRoute requiredRole="admin"><CourseList viewMode="manage" /></ProtectedRoute>} />
              <Route path="/admin/courses/create" element={<ProtectedRoute requiredRole="admin"><CourseCreate /></ProtectedRoute>} />
              <Route path="/admin/courses/:courseId/edit" element={<ProtectedRoute requiredRole="admin"><CourseUpdate /></ProtectedRoute>} />

              <Route path="/courses" element={<CourseList viewMode="browse" />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/my-courses" element={<ProtectedRoute requiredRole="student"><CourseList viewMode="enrolled" /></ProtectedRoute>} />
              <Route path="/ask-ai" element={<ProtectedRoute requiredRole="student"><AskAI /></ProtectedRoute>} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default AppRoutes;