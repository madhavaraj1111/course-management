import React from "react";
import ProgressBar from "../ProgressBar";
import { useSelector } from "react-redux";

const CourseMeta = ({ course, totalLessons }) => {
  const lessons = course.sections.flatMap((section) => section.lessons);
  const completedLessons = lessons.filter((lesson) => {
    return lesson.readLesson;
  });

  const readProgress = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  const getCategoryColor = (category) => {
    const colors = {
      Programming: "bg-blue-100 text-blue-800 border-blue-200",
      Design: "bg-purple-100 text-purple-800 border-purple-200",
      Marketing: "bg-pink-100 text-pink-800 border-pink-200",
      Business: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800 border-green-200",
      Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Advanced: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div>
      {/* Course meta section */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8 ">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
          <div className="w-full md:w-80 h-48 rounded-lg overflow-hidden shadow-md">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 w-full">
            <div className="flex flex-wrap gap-2 justify-between">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(course.category)}`}
              >
                {course.category}
              </span>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(course.difficulty)}`}
              >
                {course.difficulty}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900  text-center">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2"
                  />
                </svg>
                <span>{course.sections?.length || 0} Sections</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>{totalLessons} Lessons</span>
              </div>
            </div>
            <div className="space-y-3 p-2 px-3 pb-3 text-center bg-green-100 rouned">
              <h1 className="text-xs font-medium text-gray-700">
                Lesson Completion -{" "}
                <span className="">
                  {completedLessons.length + "/" + totalLessons}
                </span>
              </h1>
              <ProgressBar percentage={totalLessons != 0 ? readProgress : 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMeta;
