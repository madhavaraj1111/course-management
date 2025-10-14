import AdminStatsSection from "./sections/AdminStatsSection";
import AdminCoursesListSection from "./sections/AdminCoursesListSection";
import AdminSidebarSection from "./sections/AdminSidebarSection";

const AdminDashboard = ({ dashboardData, courses, navigate, handleDelete }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
        Admin Dashboard
      </h1>

      <AdminStatsSection dashboardData={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AdminCoursesListSection
            courses={courses}
            navigate={navigate}
            handleDelete={handleDelete}
          />
        </div>

        <AdminSidebarSection navigate={navigate} courses={courses} />
      </div>
    </div>
  </div>
);

export default AdminDashboard;