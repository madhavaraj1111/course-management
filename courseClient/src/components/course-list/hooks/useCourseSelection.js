import { useState, useMemo } from 'react';

export const useCourseSelection = (currentCourses, allCourses, instructorId) => {
  const [selectedCourses, setSelectedCourses] = useState(new Set());

  // Helper to get instructor ID (handles both populated and unpopulated)
  const getInstructorId = (course) => {
    return course.instructor?._id || course.instructor;
  };

  // Filter courses that belong to the current instructor (only from current page)
  const selectableCurrentCourses = useMemo(() => {
    return currentCourses.filter(course => getInstructorId(course) === instructorId);
  }, [currentCourses, instructorId]);

  // Filter all courses that belong to the current instructor
  const selectableAllCourses = useMemo(() => {
    return allCourses.filter(course => getInstructorId(course) === instructorId);
  }, [allCourses, instructorId]);

  const toggleSelect = (courseId) => {
    // Only allow toggling if the course belongs to the instructor
    const course = currentCourses.find(c => c._id === courseId);
    if (!course || getInstructorId(course) !== instructorId) return;

    setSelectedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    setSelectedCourses((prev) => {
      const newSet = new Set(prev);
      const selectableIds = selectableCurrentCourses.map(c => c._id);
      
      // Check if all selectable items on current page are selected
      const allSelectableSelected = selectableIds.every(id => newSet.has(id));
      
      if (allSelectableSelected) {
        // Deselect all selectable courses on current page
        selectableIds.forEach(id => newSet.delete(id));
      } else {
        // Select all selectable courses on current page
        selectableIds.forEach(id => newSet.add(id));
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedCourses(new Set());
  };

  const selectAll = () => {
    // Select all courses created by the instructor (across all pages)
    const allSelectableIds = selectableAllCourses.map(course => course._id);
    setSelectedCourses(new Set(allSelectableIds));
  };

  const selectableCurrentIds = selectableCurrentCourses.map(c => c._id);
  const isAllSelected = 
    selectableCurrentCourses.length > 0 && 
    selectableCurrentIds.every(id => selectedCourses.has(id));
  
  const selectedCount = selectedCourses.size;
  const hasSelected = selectedCount > 0;

  return {
    selectedCourses, // Set of IDs
    selectedCount,
    hasSelected,
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    selectAll,
    setSelectedCourses,
    selectableCurrentCourses, // Courses on current page that can be selected
    selectableAllCourses, // All courses that can be selected
  };
};