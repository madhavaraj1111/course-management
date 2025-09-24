import React from "react";
import FormSelect from "../FormSelect";
import SearchInput from "../SearchInput";
import Button from "../Button";

const CourseFilters = ({
  searchQuery,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterDifficulty,
  onDifficultyChange,
  sortOption,
  onSortChange,
  onAddCourse,
}) => {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "programming", label: "Programming" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
  ];

  const difficultyOptions = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const sortOptions = [
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
  ];

  return (
    <div className="flex flex-col justify-center gap-3 w-full sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by title or category..."
        className="w-full sm:w-auto"
      />

      {/* Category Filter */}
      <FormSelect
        label="Category"
        value={filterCategory}
        onChange={onCategoryChange}
        options={categoryOptions}
        className="w-full sm:w-auto"
      />

      {/* Difficulty Filter */}
      <FormSelect
        label="Difficulty"
        value={filterDifficulty}
        onChange={onDifficultyChange}
        options={difficultyOptions}
        className="w-full sm:w-auto"
      />

      {/* Sort */}
      <FormSelect
        label="Sort By"
        value={sortOption}
        onChange={onSortChange}
        options={sortOptions}
        className="w-full sm:w-auto"
      />
    </div>
  );
};

export default CourseFilters;
