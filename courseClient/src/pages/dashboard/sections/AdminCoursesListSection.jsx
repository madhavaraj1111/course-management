import Button from "../../../components/common/Button";
import AdminCourseItem from "../components/AdminCourseItem";

const AdminCoursesListSection = ({ courses, navigate, handleDelete }) => (
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

    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {courses.map((course) => (
        <AdminCourseItem
          key={course._id}
          course={course}
          navigate={navigate}
          handleDelete={handleDelete}
        />
      ))}

      {!courses.length && (
        <div className="text-center py-8 text-white/60">
          No courses created yet.{" "}
          <button
            onClick={() => navigate("/admin/courses/create")}
            className="text-blue-400 hover:text-blue-300 font-medium underline"
          >
            Create your first course!
          </button>
        </div>
      )}
    </div>
  </div>
);

export default AdminCoursesListSection;