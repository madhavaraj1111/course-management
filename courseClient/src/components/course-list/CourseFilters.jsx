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
  viewMode = 'manage',
}) => {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Programming", label: "Programming" },
    { value: "Design", label: "Design" },
    { value: "Business", label: "Business" },
    { value: "Marketing", label: "Marketing" },
    { value: "Data Science", label: "Data Science" },
  ];

  const difficultyOptions = [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const sortOptions = [
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  return (
    <div className="flex flex-col justify-center gap-3 w-full sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={
          viewMode === 'browse' 
            ? "Search courses to enroll..." 
            : "Search courses..."
        }
        className="w-full sm:w-auto"
      />

      <FormSelect
        label="Category"
        value={filterCategory}
        onChange={onCategoryChange}
        options={categoryOptions}
        className="w-full sm:w-auto"
      />

      <FormSelect
        label="Difficulty"
        value={filterDifficulty}
        onChange={onDifficultyChange}
        options={difficultyOptions}
        className="w-full sm:w-auto"
      />

      <FormSelect
        label="Sort By"
        value={sortOption}
        onChange={onSortChange}
        options={sortOptions}
        className="w-full sm:w-auto"
      />

      {onAddCourse && (
        <Button
          onClick={onAddCourse}
          variant="primary"
          className="w-full sm:w-auto"
        >
          Add Course
        </Button>
      )}
    </div>
  );
};
export default CourseFilters;