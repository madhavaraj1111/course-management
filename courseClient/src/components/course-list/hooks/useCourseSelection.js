import { useState } from 'react';

export const useCourseSelection = (currentCourses, allCourses) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

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
        allCourses.findIndex((x) => x === c)
      );
      setSelectedCourses(pageIndexes);
    }
  };

  const clearSelection = () => {
    setSelectedCourses([]);
  };

  const selectAll = () => {
    const allIndexes = allCourses.map((_, index) => index);
    setSelectedCourses(allIndexes);
  };

  const isAllSelected = selectedCourses.length === currentCourses.length && currentCourses.length > 0;
  const selectedCount = selectedCourses.length;
  const hasSelected = selectedCount > 0;

  return {
    selectedCourses,
    selectedCount,
    hasSelected,
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    selectAll,
    setSelectedCourses
  };
};