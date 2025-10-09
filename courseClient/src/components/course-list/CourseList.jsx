import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  deleteCourses,
  enrollCourse,
} from "../../store/slices/coursesSlice.js";

// Components (keep imports)
import PageHeader from "./PageHeader.jsx";
import CourseFilters from "./CourseFilters.jsx";
import BulkActions from "./BulkActions.jsx";
import CourseGrid from "./CourseGrid.jsx";
import Pagination from "./Pagination.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";

// Hooks
import { useCourseFilters } from "./hooks/useCourseFilters.js";
import { usePagination } from "./hooks/usePagination.js";
import { useCourseSelection } from "./hooks/useCourseSelection.js";

const CourseList = ({ viewMode = "manage" }) => {
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: courses, loading } = useSelector((state) => state.courses);
  const [showConfirm, setShowConfirm] = useState(false);

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
  } = useCourseSelection(currentCourses, courses, user?.id);

  useEffect(() => {
    if (user) {
      dispatch(
        fetchCourses({ viewMode, userRole: user.role, userId: user.id })
      );
    }
  }, [dispatch, viewMode, user]);

  useEffect(() => {
    resetToFirstPage();
  }, [filteredAndSortedCourses, resetToFirstPage]);

  const handleDeleteSelected = () => setShowConfirm(true);

  const confirmDelete = async () => {
    await dispatch(deleteCourses(Array.from(selectedCourses)));
    clearSelection();
    setShowConfirm(false);
  };

  const handleCancelDelete = () => setShowConfirm(false);

  const handleEnroll = async (courseId) => {
    const result = await dispatch(enrollCourse(courseId));
    if (result.meta.requestStatus === "fulfilled") {
      alert("Enrolled successfully!");
    } else {
      alert("Error enrolling");
    }
  };

  const getPageTitle = () => {
    switch (viewMode) {
      case "browse":
        return "Browse Courses";
      case "enrolled":
        return "My Enrolled Courses";
      case "manage":
        return user?.role === "admin" ? "Manage Courses" : "Course List";
      default:
        return "Course List";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const showBulkActions = user?.role === "admin";
  const showAddCourse = viewMode === "manage" && user?.role === "admin";

  return (
    <div className="min-h-screen">
      <div>
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <PageHeader title={getPageTitle()}>
              <CourseFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterCategory={filterCategory}
                onCategoryChange={setFilterCategory}
                filterDifficulty={filterDifficulty}
                onDifficultyChange={setFilterDifficulty}
                sortOption={sortOption}
                onSortChange={setSortOption}
                onAddCourse={
                  showAddCourse ? () => navigate("/courses/create") : null
                }
                viewMode={viewMode}
              />
            </PageHeader>
          </div>
        </div>

        {showBulkActions && (
          <BulkActions
            selectedCount={selectedCount}
            totalCount={currentCourses.length}
            isAllSelected={isAllSelected}
            onToggleSelectAll={toggleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
        )}

        <CourseGrid
          courses={currentCourses}
          allCourses={courses}
          selectedCourses={selectedCourses}
          onToggleSelect={toggleSelect}
          viewMode={viewMode}
          userRole={user?.role}
          instructorId={user?.id}
          onEnroll={handleEnroll}
          showSelection={showBulkActions}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {showBulkActions && (
          <DeleteConfirmModal
            isOpen={showConfirm}
            selectedCount={selectedCount}
            onConfirm={confirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default CourseList;
