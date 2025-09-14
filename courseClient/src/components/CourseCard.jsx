import React from "react";
import DOMPurify from "dompurify";

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
};

const CourseCard = ({ course }) => {
  const sanitizeCourseDesc = DOMPurify.sanitize(course.description);
  return (
    <div className="bg-whiterounded-lg shadow flex flex-col">
      {/* Thumbnail */}
      <img
        src={course.thumbnail || "https://usmc.redvector.com/lpe/assets/core/img/large-placeholder-course.png"}
        alt={course.title}
        className="h-40 w-full object-cover rounded-md mb-4"
      />

      {/* Category & Difficulty */}
      <div className="flex items-center gap-2 mb-1 p-4">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {course.category}
        </span>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            difficultyColors[course.difficulty] || "bg-gray-100 text-gray-800"
          }`}
        >
          {course.difficulty}
        </span>
      </div>

      <div className="px-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        {/* Course Description */}
        <p
          dangerouslySetInnerHTML={{ __html: sanitizeCourseDesc }}
          className="text-gray-500 text-sm"
        />
      </div>

      {/* Actions button */}
      <div className=" flex justify-end pr-10 gap-5 pb-10 pt-2">
        <button className="text-gray-600 bg-gray-200 rounded hover:bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="p-2  hover:text-green-800 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
            />
          </svg>
        </button>
        <button className="bg-gray-200 text-gray-600 hover:bg-red-200 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="p-2 hover:text-red-600 cursor-pointer"
          >
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;