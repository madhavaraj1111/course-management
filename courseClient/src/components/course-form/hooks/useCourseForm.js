// useCourseForm.js - SIMPLIFIED
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

  useEffect(() => {
    if (mode === "update" && Object.keys(initialData).length > 0) {
      reset({ ...initialData, sections: initialData.sections || [] });
    }
  }, [initialData, reset, mode]);

  const handleFormSubmit = (data, onSubmit) => {
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
        })) || []
      })).filter(s => s.title)
    };

    cleanedData.sections.forEach(section => {
      section.lessons = section.lessons.filter(l => l.title);
    });

    // Just call onSubmit with cleaned data - let parent handle Redux
    onSubmit(cleanedData);
  };

  return { form, handleFormSubmit };
};