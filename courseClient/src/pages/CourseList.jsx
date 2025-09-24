import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../store/slices/coursesSlice";

// Components
import PageHeader from "../components/course-list/PageHeader.jsx";
import CourseFilters from "../components/course-list/CourseFilters";
import BulkActions from "../components/course-list/BulkActions";
import CourseGrid from "../components/course-list/CourseGrid";
import Pagination from "../components/course-list/Pagination.jsx";
import DeleteConfirmModal from "../components/course-list/DeleteConfirmModal";

// Hooks
import { useCourseFilters } from "../components/course-list/hooks/useCourseFilters.js";
import { usePagination } from "../components/course-list/hooks/usePagination.js";
import { useCourseSelection } from "../components/course-list/hooks/useCourseSelection.js";
import Header from "../components/Header.jsx";

const CourseList = () => {
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [showConfirm, setShowConfirm] = useState(false);

  // Custom hooks
  const {
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterDifficulty,
    setFilterDifficulty,
    sortOption,
    setSortOption,
    filteredAndSortedCourses,
  } = useCourseFilters(courses);

  const {
    currentItems: currentCourses,
    totalPages,
    currentPage,
    goToPage,
    resetToFirstPage,
  } = usePagination(filteredAndSortedCourses, 10);

  const {
    selectedCourses,
    selectedCount,
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
  } = useCourseSelection(currentCourses, courses);

  // Reset pagination when filters change
  useEffect(() => {
    resetToFirstPage();
  }, [filteredAndSortedCourses, resetToFirstPage]);

  // Handlers
  const handleAddCourse = () => navigate("/courses/create");

  const handleDeleteSelected = () => setShowConfirm(true);

  const confirmDelete = () => {
    selectedCourses.forEach((index) => dispatch(deleteCourse(index)));
    clearSelection();
    setShowConfirm(false);
  };

  const handleCancelDelete = () => setShowConfirm(false);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div>
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <PageHeader title="Course List">
              <CourseFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterCategory={filterCategory}
                onCategoryChange={setFilterCategory}
                filterDifficulty={filterDifficulty}
                onDifficultyChange={setFilterDifficulty}
                sortOption={sortOption}
                onSortChange={setSortOption}
                onAddCourse={handleAddCourse}
              />
            </PageHeader>
          </div>
        </div>

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selectedCount}
          totalCount={currentCourses.length}
          isAllSelected={isAllSelected}
          onToggleSelectAll={toggleSelectAll}
          onDeleteSelected={handleDeleteSelected}
        />

        {/* Course Grid */}
        <CourseGrid
          courses={currentCourses}
          allCourses={courses}
          selectedCourses={selectedCourses}
          onToggleSelect={toggleSelect}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showConfirm}
          selectedCount={selectedCount}
          onConfirm={confirmDelete}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
};

export default CourseList;
