// hooks/useCourseForm.js
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const useCourseForm = (initialData = {}, mode = "create") => {
  const form = useForm({
    defaultValues: {
      courseId: `${uuidv4()}`,
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
      reset(initialData);
    }
  }, [initialData, reset, mode]);

  const handleFormSubmit = (data, onSubmit) => {
    onSubmit(data);
  };

  return {
    form,
    handleFormSubmit,
  };
};
