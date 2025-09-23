import React from "react";
import CourseThumbnail from "./CourseThumbnail";
import CourseInfo from "./CourseInfo";

const BookCover = ({ course, cardColorGradient, isHovered }) => {
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
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded bg-white/10 text-white">
              {course.category}
            </span>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20 text-white border border-white/20">
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Thumbnail */}
        <CourseThumbnail 
          thumbnail={course.thumbnail}
          title={course.title}
        />

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