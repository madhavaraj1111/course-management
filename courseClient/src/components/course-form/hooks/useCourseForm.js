import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCourse, updateCourse } from "../../../store/slices/coursesSlice";

export const useCourseForm = (initialData = {}, mode = "create") => {
  const dispatch = useDispatch();
  
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
      const formData = {
        ...initialData,
        sections: initialData.sections || [],
      };
      reset(formData);
    }
  }, [initialData, reset, mode]);

  const handleFormSubmit = async (data, onSubmit) => {
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
      }))
    };

    cleanedData.sections = cleanedData.sections.filter(section => 
      section.title && section.title.length > 0
    );

    cleanedData.sections.forEach(section => {
      section.lessons = section.lessons.filter(lesson => 
        lesson.title && lesson.title.length > 0
      );
    });

    try {
      if (mode === "create") {
        await dispatch(createCourse(cleanedData)).unwrap();
      } else {
        await dispatch(updateCourse({ id: initialData._id, data: cleanedData })).unwrap();
      }
      onSubmit?.();
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return {
    form,
    handleFormSubmit,
  };
};