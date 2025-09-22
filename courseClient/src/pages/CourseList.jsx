import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../store/slices/coursesSlice";
import Button from "../components/Button";
import FormSelect from "../components/FormSelect";
import Checkbox from "../components/CheckBox";

const CourseList = () => {
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [sortOption, setSortOption] = useState("title-asc");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const coursesPerPage = 10;

  // --- Filtering & Sorting ---
  let filteredCourses = courses?.filter(
    (course) =>
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === "title-asc") return a.title.localeCompare(b.title);
    if (sortOption === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  // --- Pagination ---
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

  // --- Selection Handlers ---
  const toggleSelect = (index) => {
    setSelectedCourses((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCourses.length === currentCourses.length) {
      setSelectedCourses([]);
    } else {
      const pageIndexes = currentCourses.map((c) =>
        courses.findIndex((x) => x === c)
      );
      setSelectedCourses(pageIndexes);
    }
  };

  const confirmDelete = () => {
    selectedCourses.forEach((index) => dispatch(deleteCourse(index)));
    setSelectedCourses([]);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  // --- Controls ---
  const handleReturn = () => navigate("/courses/create");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-2 p-4 py-8 rounded-lg shadow-lg bg-gray-500/10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/40 drop-shadow-lg">
            Course List
          </h1>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-60 px-4 py-2 rounded-lg text-white text-sm bg-white/10 backdrop-blur-md shadow-sm placeholder-white/50 outline-none"
            />

            {/* Category Filter */}
            <FormSelect
              label="Category"
              value={filterCategory}
              onChange={setFilterCategory}
              options={[
                { value: "all", label: "All Categories" },
                { value: "programming", label: "Programming" },
                { value: "design", label: "Design" },
                { value: "business", label: "Business" },
                { value: "marketing", label: "Marketing" },
              ]}
            />

            {/* Difficulty Filter */}
            <FormSelect
              label="Difficulty"
              value={filterDifficulty}
              onChange={setFilterDifficulty}
              options={[
                { value: "all", label: "All Levels" },
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
              ]}
            />

            {/* Sort */}
            <FormSelect
              label="Sort By"
              value={sortOption}
              onChange={setSortOption}
              options={[
                { value: "title-asc", label: "Title (A-Z)" },
                { value: "title-desc", label: "Title (Z-A)" },
              ]}
            />

            {/* Add Course Button */}

            <Button onClick={handleReturn} variant="primary">
              Add Course
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex justify-between items-center mb-4">
          <Checkbox
            label="Select All"
            checked={
              selectedCourses.length === currentCourses.length &&
              currentCourses.length > 0
            }
            onChange={toggleSelectAll}
          />

          <div className="h-10 flex items-center">
            {selectedCourses.length > 0 && (
              <Button onClick={() => setShowConfirm(true)} variant="danger">
                Delete Selected ({selectedCourses.length})
              </Button>
            )}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 place-items-center">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => {
              const actualIndex = courses.findIndex((c) => c === course);
              return (
                <CourseCard
                  key={actualIndex}
                  course={course}
                  index={actualIndex}
                  selected={selectedCourses.includes(actualIndex)}
                  onToggleSelect={() => toggleSelect(actualIndex)}
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
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
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
                  : "bg-gray-700 text-white hover:bg-gray-600 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div
            className="relative w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl
      bg-white/10 backdrop-blur-xl border border-white/20
      text-center text-white animate-fadeIn"
          >
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/30 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/30 blur-3xl rounded-full pointer-events-none"></div>

            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6 text-white/80">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-lg">
                {selectedCourses.length}
              </span>{" "}
              {selectedCourses.length === 1 ? "course" : "courses"}?
            </p>

            <div className="flex justify-center gap-6">
              <Button onClick={confirmDelete} variant="danger">
                Delete
              </Button>
              <Button onClick={handleCancelDelete} variant="glass">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
