import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, apiRequest } from "../contexts/AuthContext";

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

const CourseList = ({ viewMode = "manage" }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch courses based on view mode
  useEffect(() => {
    fetchCourses();
  }, [viewMode, user]);

  // Reset pagination when filters change
  useEffect(() => {
    resetToFirstPage();
  }, [filteredAndSortedCourses, resetToFirstPage]);

  const fetchCourses = async () => {
    try {
      let data;

      switch (viewMode) {
        case "browse":
          // All available courses for browsing
          data = await apiRequest("/courses");
          break;

        case "enrolled":
          // Get enrolled courses from student dashboard
          const dashboardData = await apiRequest("/student/dashboard");

          data = dashboardData.enrolledCourses.map((course) => ({
            ...course, // keep all fields: title, description, thumbnail, sections, lessons, etc.
            isEnrolled: true,
          }));

          break;

        case "manage":
          // Admin's courses or all courses for students
          if (user?.role === "admin") {
            data = await apiRequest("/admin/courses");
          } else {
            data = await apiRequest("/courses");
          }
          break;

        default:
          data = await apiRequest("/courses");
      }

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleAddCourse = () => navigate("/courses/create");

  const handleDeleteSelected = () => setShowConfirm(true);

  const confirmDelete = async () => {
    try {
      const deletePromises = selectedCourses.map((courseIndex) => {
        const courseId = currentCourses[courseIndex]._id;
        return apiRequest(`/admin/courses/${courseId}`, { method: "DELETE" });
      });

      await Promise.all(deletePromises);

      // Refresh courses list
      await fetchCourses();
      clearSelection();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting courses:", error);
      alert("Error deleting courses: " + error.message);
    }
  };

  const handleCancelDelete = () => setShowConfirm(false);

  const handleEnroll = async (courseId) => {
    try {
      await apiRequest(`/courses/${courseId}/enroll`, { method: "POST" });
      await fetchCourses(); // Refresh to update enrollment status
      alert("Enrolled successfully!");
    } catch (error) {
      alert("Error enrolling: " + error.message);
    }
  };

  // Get page title based on view mode
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

  const showBulkActions = viewMode === "manage" && user?.role === "admin";
  const showAddCourse = viewMode === "manage" && user?.role === "admin";

  return (
    <div className="min-h-screen">
      {/* Header Section */}
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
                onAddCourse={showAddCourse ? handleAddCourse : null}
                viewMode={viewMode}
              />
            </PageHeader>
          </div>
        </div>

        {/* Bulk Actions - Only for Admin in manage mode */}
        {showBulkActions && (
          <BulkActions
            selectedCount={selectedCount}
            totalCount={currentCourses.length}
            isAllSelected={isAllSelected}
            onToggleSelectAll={toggleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
        )}

        {/* Course Grid */}
        <CourseGrid
          courses={currentCourses}
          allCourses={courses}
          selectedCourses={selectedCourses}
          onToggleSelect={toggleSelect}
          viewMode={viewMode}
          userRole={user?.role}
          instructorId={user.id}
          onEnroll={handleEnroll}
          showSelection={showBulkActions}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />

        {/* Delete Confirmation Modal - Only for Admin */}
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
