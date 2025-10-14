import StatsCard from "../components/StatsCard";

const AdminStatsSection = ({ dashboardData }) => (
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
);

export default AdminStatsSection;