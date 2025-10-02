import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, apiRequest } from "../contexts/AuthContext";
import Button from "../components/common/Button"; // Adjust the import path as needed
import ProgressBar from "../components/common/ProgressBar";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    if (user?.role === "admin") {
      fetchAdminCourses();
    }
  }, [user]);

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await apiRequest(`/admin/courses/${courseId}`, {
        method: "DELETE",
      });
      // Refresh courses after deletion
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course. Please try again.");
    }
  };

  const fetchDashboardData = async () => {
    try {
      let data;
      if (user?.role === "admin") {
        data = await apiRequest("/admin/dashboard");
      } else {
        data = await apiRequest("/student/dashboard");
      }
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminCourses = async () => {
    try {
      const coursesData = await apiRequest("/admin/courses");
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching admin courses:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const StatsCard = ({ title, value, subtitle }) => (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 hover:bg-white/15 transition-all">
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      {subtitle && <p className="text-sm text-white/60 mt-1">{subtitle}</p>}
    </div>
  );

  // Student Dashboard
  if (user?.role === "student") {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            Welcome, {user.username}!
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <StatsCard
              title="Enrolled Courses"
              value={dashboardData?.totalEnrolled || 0}
            />
            <StatsCard
              title="Completed Courses"
              value={dashboardData?.completedCourses || 0}
            />
            <StatsCard
              title="Average Progress"
              value={`${dashboardData?.avgProgress || 0}%`}
            />
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-white">My Courses</h2>
              <Button
                onClick={() => navigate("/courses")}
                variant="info"
                size="md"
              >
                Browse Courses
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData?.enrolledCourses?.map((course) => (
                <div
                  key={course._id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all"
                >
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white">
                    {course.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    by {course.instructorName}
                  </p>

                  {/* Updated Progress Bar */}
                  <div className="mb-4 px-3">
                    <ProgressBar percentage={course.progress} />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/70">
                      {course.progress}% complete
                    </p>
                    <Button
                      onClick={() => navigate(`/courses/${course._id}`)}
                      variant="success"
                      size="sm"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              ))}

              {!dashboardData?.enrolledCourses?.length && (
                <div className="col-span-full text-center py-12 text-white/60">
                  No enrolled courses yet.{" "}
                  <button
                    onClick={() => navigate("/courses")}
                    className="text-blue-400 hover:text-blue-300 font-medium underline"
                  >
                    Browse courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Total Courses"
            value={dashboardData?.totalCourses || 0}
          />
          <StatsCard
            title="Total Students"
            value={dashboardData?.totalStudents || 0}
          />
          <StatsCard
            title="Active Enrollments"
            value={dashboardData?.activeEnrollments || 0}
          />
          <StatsCard
            title="Avg Completion"
            value={`${dashboardData?.avgCompletion || 0}%`}
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">My Courses</h2>
                <Button
                  onClick={() => navigate("/admin/courses/create")}
                  variant="info"
                  size="md"
                >
                  Create Course
                </Button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hidden">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="font-medium text-white">
                          {course.title}
                        </h3>
                        <div className="">
                          <p className="text-sm text-white/60">
                            {course.category} • {course.difficulty}
                          </p>
                          <p className="text-sm text-blue-400">
                            {course.enrolledStudents?.length || 0} students
                            enrolled
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            navigate(`admin/courses/${course._id}/edit`)
                          }
                          variant="success"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => navigate(`/courses/${course._id}`)}
                          variant="glass"
                          size="sm"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleDelete(course._id)}
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {!courses.length && (
                  <div className="text-center py-8 text-white/60">
                    No courses created yet.{" "}
                    <button
                      onClick={() => navigate("/admin/courses/create")}
                      className="text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer"
                    >
                      Create your first course!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-4 sm:p-6 self-start">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/admin/courses/create")}
                variant="info"
                size="lg"
                className="w-full"
              >
                Create New Course
              </Button>
              <Button
                onClick={() => navigate("/courses")}
                variant="glass"
                size="lg"
                className="w-full"
              >
                Manage All Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
