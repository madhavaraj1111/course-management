import { useState, useMemo } from 'react';

export const useCourseFilters = (courses) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [sortOption, setSortOption] = useState("title-asc");

  const filteredAndSortedCourses = useMemo(() => {
    if (!courses) return [];

    // Filter by search query
    let filtered = courses.filter(
      (course) =>
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (course) =>
          course.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Filter by difficulty
    if (filterDifficulty !== "all") {
      filtered = filtered.filter(
        (course) =>
          course.difficulty?.toLowerCase() === filterDifficulty.toLowerCase()
      );
    }

    // Sort courses
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

    return sorted;
  }, [courses, searchQuery, filterCategory, filterDifficulty, sortOption]);

  const resetFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterDifficulty("all");
    setSortOption("title-asc");
  };

  return {
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    filterDifficulty,
    setFilterDifficulty,
    sortOption,
    setSortOption,
    filteredAndSortedCourses,
    resetFilters
  };
};