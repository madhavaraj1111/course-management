import Button from "../../../components/common/Button";
import CourseCard from "../components/CourseCard";

const StudentCoursesSection = ({ dashboardData, navigate }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-xl font-semibold text-white">My Courses</h2>
      <Button onClick={() => navigate("/courses")} variant="info" size="md">
        Browse Courses
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dashboardData?.enrolledCourses?.map((course) => (
        <CourseCard key={course._id} course={course} navigate={navigate} />
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
);

export default StudentCoursesSection;