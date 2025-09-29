import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth, apiRequest } from "../contexts/AuthContext";

const Dashboard = ({ userRole }) => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    if (user?.role === "admin") {
      fetchAdminCourses();
    }
  }, [user]);

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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const StatsCard = ({ title, value, subtitle }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );

  // Student Dashboard
  if (user?.role === "student") {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Courses</h2>
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Browse Courses
              </Link>
            </div>

            <div className="space-y-4">
              {dashboardData?.enrolledCourses?.map((course) => (
                <div key={course._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-gray-600">
                        by {course.instructorName}
                      </p>
                    </div>
                    <Link
                      to={`/courses/${course._id}`}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Continue
                    </Link>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {course.progress}% complete
                  </p>
                </div>
              ))}

              {!dashboardData?.enrolledCourses?.length && (
                <div className="text-center py-8 text-gray-500">
                  No enrolled courses yet.{" "}
                  <Link to="/courses" className="text-blue-600 hover:underline">
                    Browse courses to get started!
                  </Link>
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
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Courses</h2>
                <Link
                  to="admin/courses/create"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create Course
                </Link>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-600">
                          {course.category} • {course.difficulty}
                        </p>
                        <p className="text-sm text-blue-600">
                          {course.enrolledStudents?.length || 0} students
                          enrolled
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`admin/courses/${course._id}/edit`}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/courses/${course._id}`}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {!courses.length && (
                  <div className="text-center py-8 text-gray-500">
                    No courses created yet.{" "}
                    <Link
                      to="/courses/create"
                      className="text-blue-600 hover:underline"
                    >
                      Create your first course!
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="admin/courses/create"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700"
              >
                Create New Course
              </Link>
              <Link
                to="/courses"
                className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded hover:bg-gray-700"
              >
                Manage All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
