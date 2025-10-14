import StudentStatsSection from "./sections/StudentStatsSection";
import StudentCoursesSection from "./sections/StudentCoursesSection";

const StudentDashboard = ({ user, dashboardData, navigate }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
        Welcome, {user.username}!
      </h1>

      <StudentStatsSection dashboardData={dashboardData} />
      <StudentCoursesSection dashboardData={dashboardData} navigate={navigate} />
    </div>
  </div>
);

export default StudentDashboard;