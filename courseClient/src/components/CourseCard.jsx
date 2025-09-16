import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../store/slices/coursesSlice";

// Color themes for the cover glow
const cardColors = {
  Programming: "from-sky-500/20 to-sky-900",
  Design: "from-teal-500 to-teal-900/20",
  Marketing: "from-rose-500/30 to-rose-900",
  Business: "from-amber-500 to-amber-900/20",
  Default: "from-purple-500/20 to-purple-900",
};

const CourseCard = ({ course,index }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const cardColorGradient = cardColors[course.category] || cardColors.Default;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      dispatch(deleteCourse(index));
    }
  };

  return (
    <div
      className="relative w-80 h-96 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Container */}
      <div className="relative w-full h-full transform-style-preserve-3d">
        {/* Spine / Back */}
        <div className="absolute inset-0 bg-black/50 rounded-lg shadow-2xl transform rotateY-2 translate-z-[-8px]"></div>

        {/* Cover */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-xl shadow-black/40 transform transition-all duration-700 origin-left ${
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

            {/* Thumbnail in center */}
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="w-48 h-36 rounded-xl overflow-hidden shadow-md border border-white/20 backdrop-blur-sm relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />

                {/* faded corners / vignette overlay */}
                <div
                  className="absolute inset-0 rounded-xl 
        bg-gradient-to-tr from-black/40 via-transparent to-black/40 
        pointer-events-none"
                ></div>
                <div
                  className="absolute inset-0 rounded-xl 
        bg-gradient-to-bl from-black/30 via-transparent to-black/30 
        pointer-events-none"
                ></div>
              </div>
            </div>

            {/* Title */}
            <div className="relative z-10 mt-4">
              <h3 className="text-2xl font-bold leading-tight text-center w-full">
                {course.title}
              </h3>
            </div>

            {/* Bottom Info */}
            <div className="relative z-10 flex justify-between text-sm text-white/80 mt-4">
              <span>{course.sections?.length || 0} sections</span>
              <span>
                {course.sections?.reduce(
                  (total, s) => total + (s.lessons?.length || 0),
                  0
                ) || 0}{" "}
                lessons
              </span>
            </div>

            {/* Binding lines */}
            <div className="absolute left-2 top-0 bottom-0 w-px bg-white/20"></div>
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10"></div>
          </div>
        </div>

        {/* Inner Pages */}
        <div
          className={`absolute inset-0 bg-white rounded-r-lg shadow-lg transform transition-all duration-700 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="h-full p-6 flex flex-col relative">
            {/* Page flutter layers */}
            <div>
              <div className="absolute inset-0 bg-white/20 rounded-r-lg transform translate-x-1 translate-y-1 rotate-1 pointer-events-none"></div>
              <div className="absolute inset-0 bg-white/10 rounded-r-lg transform translate-x-2 translate-y-2 rotate-2 pointer-events-none"></div>
            </div>

            {/* Header */}
            <div className="border-b border-gray-300 pb-4 mb-6 relative z-10">
              <h4 className="text-lg font-bold text-gray-800 text-center">
                Course Index
              </h4>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto space-y-4 relative z-10">
              {course.sections?.length ? (
                course.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="border-l-2 border-purple-200 pl-4"
                  >
                    <h5 className="font-semibold text-gray-800 mb-2">
                      {sectionIndex + 1}. {section.title}
                    </h5>
                    <ul className="space-y-1">
                      {section.lessons?.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="text-sm pl-12 text-gray-600">
                  There were no sections found
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-gray-300 pt-4 flex justify-end relative z-10">
              <div className="flex gap-5">
                {/* Edit */}
                <button className="p-2 transition-all text-gray-400 hover:text-purple-600 hover:bg-purple-200 cursor-pointer bg-gray-200 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                    />
                  </svg>
                </button>
                {/* Delete */}
                <button
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-200 cursor-pointer bg-gray-200 rounded transition-all"
                  onClick={handleDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Page lines */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-red-200"></div>
            <div className="absolute left-14 top-0 bottom-0 w-px bg-blue-100"></div>
          </div>
        </div>

        {/* Hover pulse */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isHovered ? "animate-pulse" : ""
          }`}
        ></div>
      </div>

      {/* Custom styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotateY-0 { transform: rotateY(0deg); }
        .rotateY-2 { transform: rotateY(2deg); }
        .rotateY-\\[-160deg\\] { transform: rotateY(-160deg); }
        .translate-z-\\[-8px\\] { transform: translateZ(-8px); }
      `}</style>
    </div>
  );
};

export default CourseCard;
