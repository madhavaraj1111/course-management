import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CourseList from "../pages/CourseList";
import CourseDetail from "../components/course-detail/CourseDetail.jsx";
import CourseCreate from "../pages/CourseCreate.jsx";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout.jsx";
import CourseUpdate from "../pages/CourseUpdate.jsx";
import Login from "../pages/Login.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes (no MainLayout) */}

        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="courses/create" element={<CourseCreate />} />
          <Route path="courses/update" element={<CourseUpdate />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
