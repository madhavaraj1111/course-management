import React from "react";
import CourseCard from "../course-card/CourseCard";

const CourseGrid = ({
  courses,
  allCourses,
  selectedCourses,
  onToggleSelect,
}) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
        <p className="text-white text-center col-span-full">
          No courses found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
      {courses.map((course, index) => {
        const actualIndex = allCourses.findIndex((c) => c === course);
        return (
          <CourseCard
            key={actualIndex}
            course={course}
            index={actualIndex}
            selected={selectedCourses.includes(actualIndex)}
            onToggleSelect={() => onToggleSelect(actualIndex)}
          />
        );
      })}
    </div>
  );
};

export default CourseGrid;
