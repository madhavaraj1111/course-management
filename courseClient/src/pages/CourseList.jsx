import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const courses = useSelector((state) => state.courses.list);
  const navigate = useNavigate();

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  // calculate pagination indices
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);

  // total pages
  const totalPages = Math.ceil(courses?.length / coursesPerPage);
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleReturn = () => {
    navigate("/courses/create");
  };

  return (
    <div className="min-h-screen">
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12  p-4 sm:p-6 rounded-lg shadow-lg bg-gray-500/10">
          <h1 className="text-2xl sm:text-3xl text-white font-extrabold  mb-4 sm:mb-0">
            Course List
          </h1>
          {/* Add course button */}
          <button
            className="px-6 py-3 rounded transition-transform duration-200 
             hover:scale-110 text-white shadow-white 
             hover:text-cyan-500 border border-transparent hover:border-transparent 
             shadow-md border-t hover:border-t-cyan-500 border-t-white/30 hover:shadow-cyan-500 cursor-pointer font-semibold"
            onClick={handleReturn}
          >
            Add Course
          </button>
        </div>

        {/* Grid for course cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 place-items-center">
          {currentCourses?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-cyan-500/40 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
