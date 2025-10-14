import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard, fetchAdminCourses } from "../store/slices/authSlice";
import { deleteCourses } from "../store/slices/coursesSlice";
import {
  selectUser,
  selectDashboardData,
  selectAdminCourses,
} from "../store/selectors";
import LoadingSpinner from "./dashboard/components/LoadingSpinner";
import StudentDashboard from "./dashboard/StudentDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const dashboardData = useSelector(selectDashboardData);
  const courses = useSelector(selectAdminCourses);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchDashboard());
    if (user?.role === "admin") {
      dispatch(fetchAdminCourses());
    }
  }, [dispatch, user?.role]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await dispatch(deleteCourses([courseId])).unwrap();
      dispatch(fetchAdminCourses());
    } catch (error) {
      alert("Error deleting course: " + error);
    }
  };

  if (loading && !dashboardData) {
    return <LoadingSpinner />;
  }

  if (user?.role === "student") {
    return (
      <StudentDashboard
        user={user}
        dashboardData={dashboardData}
        navigate={navigate}
      />
    );
  }

  return (
    <AdminDashboard
      dashboardData={dashboardData}
      courses={courses}
      navigate={navigate}
      handleDelete={handleDelete}
    />
  );
};

export default Dashboard;