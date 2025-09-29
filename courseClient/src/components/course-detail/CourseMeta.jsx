import React from "react";
import ProgressBar from "../ProgressBar";

const CourseMeta = ({ 
  course, 
  totalLessons, 
  progressPercent, 
  userRole, 
  isEnrolled 
}) => {
  const getCategoryColor = (category) => {
    const colors = {
      Programming: "bg-blue-100 text-blue-800 border-blue-200",
      Design: "bg-purple-100 text-purple-800 border-purple-200",
      Marketing: "bg-pink-100 text-pink-800 border-pink-200",
      Business: "bg-orange-100 text-orange-800 border-orange-200",
      "Data Science": "bg-green-100 text-green-800 border-green-200",
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

  const completedLessons = course?.progress?.length || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center">
        {/* Course Thumbnail */}
        <div className="w-full md:w-80 h-48 rounded-lg overflow-hidden shadow-md">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {course.title?.charAt(0) || 'C'}
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-4 w-full">
          <div className="flex flex-wrap gap-2 justify-between">
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(course.category)}`}>
              {course.category}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center">
            {course.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" />
              </svg>
              <span>{course.sections?.length || 0} Sections</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{totalLessons} Lessons</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>by {course.instructorName || 'Unknown'}</span>
            </div>
          </div>

          {/* Progress Section - Only for enrolled students */}
          {userRole === 'student' && isEnrolled && (
            <div className="space-y-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-medium text-gray-700 text-center">
                Your Progress - {completedLessons} / {totalLessons} lessons
              </h3>
              <ProgressBar percentage={progressPercent} />
              <div className="text-center text-sm text-gray-600">
                {progressPercent}% Complete
              </div>
            </div>
          )}

          {/* Enrollment Status */}
          {userRole === 'student' && !isEnrolled && (
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                Enroll in this course to track your progress
              </p>
            </div>
          )}

          {/* Admin Info */}
          {userRole === 'admin' && (
            <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                {course.enrolledStudents?.length || 0} students enrolled
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseMeta;