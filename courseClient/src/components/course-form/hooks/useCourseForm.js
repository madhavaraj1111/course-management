import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const useCourseForm = (initialData = {}, mode = "create") => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      category: "Programming",
      difficulty: "Beginner",
      sections: [],
      ...initialData,
    },
  });

  const { reset } = form;

  // Reset form when initialData changes (for update mode)
  useEffect(() => {
    if (mode === "update" && Object.keys(initialData).length > 0) {
      // Transform API data if needed
      const formData = {
        ...initialData,
        // Ensure sections exist
        sections: initialData.sections || [],
      };
      reset(formData);
    }
  }, [initialData, reset, mode]);

  const handleFormSubmit = (data, onSubmit) => {
    // Clean and format data for API
    const cleanedData = {
      title: data.title.trim(),
      description: data.description.trim(),
      thumbnail: data.thumbnail?.trim() || "",
      category: data.category,
      difficulty: data.difficulty,
      sections: data.sections.map(section => ({
        title: section.title.trim(),
        description: section.description?.trim() || "",
        lessons: section.lessons?.map(lesson => ({
          title: lesson.title.trim(),
          description: lesson.description?.trim() || "",
          content: lesson.content?.trim() || "",
          // Remove any UI-only fields
        })) || []
      }))
    };

    // Remove empty sections
    cleanedData.sections = cleanedData.sections.filter(section => 
      section.title && section.title.length > 0
    );

    // Remove empty lessons from sections
    cleanedData.sections.forEach(section => {
      section.lessons = section.lessons.filter(lesson => 
        lesson.title && lesson.title.length > 0
      );
    });

    onSubmit(cleanedData);
  };

  return {
    form,
    handleFormSubmit,
  };
};