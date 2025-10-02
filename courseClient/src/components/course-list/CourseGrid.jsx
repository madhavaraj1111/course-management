import CourseCard from "../course-card/CourseCard";

const CourseGrid = ({
  courses,
  allCourses,
  selectedCourses,
  onToggleSelect,
  viewMode = "manage",
  userRole,
  instructorId,
  onEnroll,
  showSelection = false,
}) => {
  if (!courses || courses.length === 0) {
    const getEmptyMessage = () => {
      switch (viewMode) {
        case "browse":
          return "No courses available to browse.";
        case "enrolled":
          return "You haven't enrolled in any courses yet.";
        case "manage":
          return userRole === "admin"
            ? "No courses created yet."
            : "No courses found.";
        default:
          return "No courses found.";
      }
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
        <p className="text-white text-center col-span-full">
          {getEmptyMessage()}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
      {courses.map((course, index) => {
        // Check if this course ID is in the selected Set
        const isSelected = showSelection && selectedCourses.has(course._id);
        
        // Get the actual instructor ID - handle both populated and unpopulated cases
        const courseInstructorId = course.instructor?._id || course.instructor;
        const canSelect = courseInstructorId === instructorId;

        return (
          <CourseCard
            key={course._id}
            course={course}
            index={index}
            selected={isSelected}
            onToggleSelect={() => onToggleSelect(course._id)}
            viewMode={viewMode}
            userRole={userRole}
            instructorId={instructorId}
            onEnroll={onEnroll}
            showSelection={showSelection && canSelect}
          />
        );
      })}
    </div>
  );
};

export default CourseGrid;