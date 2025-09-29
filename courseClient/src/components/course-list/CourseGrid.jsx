import CourseCard from "../course-card/CourseCard";

const CourseGrid = ({
  courses,
  allCourses,
  selectedCourses,
  onToggleSelect,
  viewMode = 'manage',
  userRole,
  onEnroll,
  showSelection = false,
}) => {
  
  if (!courses || courses.length === 0) {
    const getEmptyMessage = () => {
      switch (viewMode) {
        case 'browse':
          return 'No courses available to browse.';
        case 'enrolled':
          return 'You haven\'t enrolled in any courses yet.';
        case 'manage':
          return userRole === 'admin' ? 'No courses created yet.' : 'No courses found.';
        default:
          return 'No courses found.';
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
        const actualIndex = allCourses.findIndex((c) => c._id === course._id);
        const isSelected = showSelection && selectedCourses.includes(actualIndex);
        
        return (
          <CourseCard
            key={course._id || index}
            course={course}
            index={actualIndex}
            selected={isSelected}
            onToggleSelect={showSelection ? () => onToggleSelect(actualIndex) : null}
            viewMode={viewMode}
            userRole={userRole}
            onEnroll={onEnroll}
            showSelection={showSelection}
          />
        );
      })}
    </div>
  );
};

export default CourseGrid;