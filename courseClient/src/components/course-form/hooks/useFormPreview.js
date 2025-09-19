// hooks/useFormPreview.js
export const useFormPreview = (watchedValues) => {
  const previewData = {
    title: watchedValues.title || "Untitled Course",
    description: watchedValues.description || "No description yet...",
    thumbnail:
      watchedValues.thumbnail ||
      "https://usmc.redvector.com/lpe/assets/core/img/large-placeholder-course.png",
    category: watchedValues.category,
    difficulty: watchedValues.difficulty,
    sections: watchedValues.sections,
  };

  return { previewData };
};