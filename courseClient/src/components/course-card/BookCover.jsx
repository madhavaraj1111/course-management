// BookCover.jsx
import React from "react";
import CourseThumbnail from "./CourseThumbnail";
import CourseInfo from "./CourseInfo";

// BookCover.jsx
const BookCover = ({
  course,
  cardColorGradient,
  isHovered,
  viewMode,
  instructorId,
}) => {
  return (
    <div
      className={`checkbox-container absolute inset-0 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-xl shadow-black/40 transform transition-all duration-700 origin-left ${
        isHovered ? "rotateY-[-160deg]" : "rotateY-0"
      }`}
    >
      <div className="relative h-full p-6 flex flex-col justify-between text-white overflow-hidden">
        {/* Glow overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${cardColorGradient} opacity-50 rounded-lg`}
        ></div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

        {/* Header */}
        <div className="relative z-10">
          {/* Your Creation - Top Right */}
          {course.instructor?._id === instructorId && (
            <div className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded bg-green-600 text-white shadow-lg">
              BY YOU
            </div>
          )}

          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="px-3 py-1 text-xs font-semibold rounded bg-white/10 text-white">
              {course.category}
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white border border-white/20">
              {course.difficulty}
            </span>
            {viewMode === "browse" && course.isEnrolled && (
              <span className="px-3 py-1 text-xs font-semibold rounded bg-green-600 text-white">
                Enrolled
              </span>
            )}
            {viewMode === "enrolled" && course.progress !== undefined && (
              <span className="px-3 py-1 text-xs font-semibold rounded bg-blue-500 text-white">
                {course.progress}% Complete
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        <CourseThumbnail thumbnail={course.thumbnail} title={course.title} />

        {/* Course Info */}
        <CourseInfo course={course} />

        {/* Binding lines */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-white/20"></div>
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10"></div>
      </div>
    </div>
  );
};

export default BookCover;
