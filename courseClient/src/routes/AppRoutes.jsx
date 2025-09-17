import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CourseList from "../pages/CourseList";
import CourseDetail from "../pages/CourseDetail";
import CourseCreate from "../pages/CourseCreate.jsx";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout.jsx";
import CourseUpdate from "../pages/CourseUpdate.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/create" element={<CourseCreate />} />
          <Route path="/courses/update" element={<CourseUpdate />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
