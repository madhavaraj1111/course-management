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
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">All Courses</h1>
        <button
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleReturn}
        >
          Add Course
        </button>
      </div>
      
      {/* Grid for course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {courses?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;