import React from 'react';
import FormSelect from '../FormSelect';
import SearchInput from '../SearchInput';
import Button from '../Button';

const CourseFilters = ({
  searchQuery,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  filterDifficulty,
  onDifficultyChange,
  sortOption,
  onSortChange,
  onAddCourse
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
    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by title or category..."
      />

      {/* Category Filter */}
      <FormSelect
        label="Category"
        value={filterCategory}
        onChange={onCategoryChange}
        options={categoryOptions}
      />

      {/* Difficulty Filter */}
      <FormSelect
        label="Difficulty"
        value={filterDifficulty}
        onChange={onDifficultyChange}
        options={difficultyOptions}
      />

      {/* Sort */}
      <FormSelect
        label="Sort By"
        value={sortOption}
        onChange={onSortChange}
        options={sortOptions}
      />

      {/* Add Course Button */}
      <Button onClick={onAddCourse} variant="primary">
        Add Course
      </Button>
    </div>
  );
};

export default CourseFilters;