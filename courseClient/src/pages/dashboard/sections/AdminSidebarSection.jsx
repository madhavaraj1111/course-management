import Button from "../../../components/common/Button";
import CategoryDistributionChart from "../components/CategoryDistributionChart";

const AdminSidebarSection = ({ navigate, courses }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-4 sm:p-6 self-start">
    <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
    <div className="space-y-3 mb-6">
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

    {courses.length > 0 && (
      <>
        <h2 className="mt-10 text-xl font-semibold text-white">
          Course Distribution
        </h2>
        <CategoryDistributionChart courses={courses} />
      </>
    )}
  </div>
);

export default AdminSidebarSection;