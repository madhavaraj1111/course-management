import StatsCard from "../components/StatsCard";

const StudentStatsSection = ({ dashboardData }) => (
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
);

export default StudentStatsSection;