import React from "react";

const CourseInfo = ({ course }) => {
  const sectionsCount = course.sections?.length || 0;
  const lessonsCount =
    course.sections?.reduce(
      (total, s) => total + (s.lessons?.length || 0),
      0
    ) || 0;

  return (
    <>
      {/* Title */}
      <div className="relative z-10 mt-4">
        <h3 className="text-2xl font-bold leading-tight text-center w-full break-words">
          {course.title}
        </h3>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 flex justify-between text-sm text-white/80 mt-4">
        <span>{sectionsCount} sections</span>
        <span>{lessonsCount} lessons</span>
      </div>
    </>
  );
};

export default CourseInfo;
