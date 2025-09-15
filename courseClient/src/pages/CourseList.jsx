import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const courses = useSelector((state) => state.courses.list);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/courses/create");
  };

  return (
    <div className="min-h-screen">
      {/* Main container - centered and well-aligned */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Header section - perfectly centered */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12  p-4 sm:p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
            All Courses
          </h1>
          <button
            className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleReturn}
          >
            Add Course
          </button>
        </div>

        {/* Grid for course cards - perfectly centered and aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 place-items-center">
          {courses?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
