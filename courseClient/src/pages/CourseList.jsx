import React, { useState } from "react";
import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const courses = useSelector((state) => state.courses.list);
  const navigate = useNavigate();

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [sortOption, setSortOption] = useState("title-asc");
  const coursesPerPage = 10;

  // --- STEP 1: Search (title or category) ---
  let filteredCourses = courses?.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- STEP 2: Filters ---
  if (filterCategory !== "all") {
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.category?.toLowerCase() === filterCategory.toLowerCase()
    );
  }

  if (filterDifficulty !== "all") {
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.difficulty?.toLowerCase() === filterDifficulty.toLowerCase()
    );
  }

  // --- STEP 3: Sorting ---
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  // --- STEP 4: Pagination ---
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  // Handlers
  const handleReturn = () => navigate("/courses/create");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };
  const handleDifficultyChange = (e) => {
    setFilterDifficulty(e.target.value);
    setCurrentPage(1);
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8 p-4 rounded-lg shadow-lg bg-gray-500/10">
          <h1
            className="text-3xl sm:text-4xl font-extrabold 
    text-transparent bg-clip-text 
    bg-gradient-to-r from-white/80 to-white/40 
    drop-shadow-lg"
          >
            Course List
          </h1>

          {/* Controls wrapper */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-60 px-4 py-2 rounded-lg text-white text-sm
      bg-white/10 backdrop-blur-md shadow-sm placeholder-white/50
      outline-none focus:outline-none"
            />
            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={handleCategoryChange}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-white text-sm
      bg-white/10 backdrop-blur-md shadow-sm
      outline-none focus:outline-none"
            >
              <option value="all" className="bg-gray-900/80 text-white">
                All Categories
              </option>
              <option value="programming" className="bg-gray-900/80 text-white">
                Programming
              </option>
              <option value="design" className="bg-gray-900/80 text-white">
                Design
              </option>
              <option value="business" className="bg-gray-900/80 text-white">
                Business
              </option>
              <option value="marketing" className="bg-gray-900/80 text-white">
                Marketing
              </option>
            </select>
            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={handleDifficultyChange}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-white text-sm
      bg-white/10 backdrop-blur-md shadow-sm
      outline-none focus:outline-none"
            >
              <option value="all" className="bg-gray-900/80 text-white">
                All Levels
              </option>
              <option value="beginner" className="bg-gray-900/80 text-white">
                Beginner
              </option>
              <option
                value="intermediate"
                className="bg-gray-900/80 text-white"
              >
                Intermediate
              </option>
              <option value="advanced" className="bg-gray-900/80 text-white">
                Advanced
              </option>
            </select>
            {/* Sort */}
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full sm:w-auto px-4 py-2 rounded-lg text-white text-sm
      bg-white/10 backdrop-blur-md shadow-sm
      outline-none focus:outline-none"
            >
              <option value="title-asc" className="bg-gray-900/80 text-white">
                Title (A-Z)
              </option>
              <option value="title-desc" className="bg-gray-900/80 text-white">
                Title (Z-A)
              </option>
            </select>
            {/* Add Course */}{" "}
            <button
              onClick={handleReturn}
              className="px-6 py-3 rounded transition-transform duration-200 hover:scale-110 text-white shadow-white hover:text-cyan-500 border border-transparent shadow-md border-t hover:border-t-cyan-500 border-t-white/30 hover:shadow-cyan-500 cursor-pointer font-semibold w-full sm:w-auto"
            >
              {" "}
              Add Course{" "}
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => {
              // Find the actual index in the original courses array
              const actualIndex = courses.findIndex((c) => c === course);
              return (
                <CourseCard
                  key={actualIndex}
                  course={course}
                  index={actualIndex}
                />
              );
            })
          ) : (
            <p className="text-white text-center col-span-full">
              No courses found.
            </p>
          )}
        </div>

        {/* Pagination */}
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
