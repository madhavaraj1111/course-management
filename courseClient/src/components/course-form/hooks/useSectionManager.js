// hooks/useSectionManager.js
import { useState } from "react";

export const useSectionManager = (setValue, getValues) => {
  const [sectionCount, setSectionCount] = useState("");
  const [lessonCount, setLessonCount] = useState({});

  const addSection = () => {
    const count = parseInt(sectionCount, 10) || 1;
    const currentSections = getValues("sections") || [];

    const newSections = Array.from({ length: count }, () => ({
      title: "",
      description: "",
      lessons: [],
    }));

    setValue("sections", [...currentSections, ...newSections]);
    setSectionCount("");
  };

  const addLesson = (sectionIndex) => {
    const count = parseInt(lessonCount[sectionIndex], 10) || 1;
    const currentSections = [...getValues("sections")];

    const newLessons = Array.from({ length: count }, () => ({
      title: "",
      description: "",
    }));

    currentSections[sectionIndex].lessons.push(...newLessons);
    setValue("sections", currentSections);

    setLessonCount({ ...lessonCount, [sectionIndex]: "" });
  };

  const removeSection = (sectionIndex) => {
    const currentSections = getValues("sections");
    const newSections = currentSections.filter((_, i) => i !== sectionIndex);
    setValue("sections", newSections);
  };

  const removeLesson = (sectionIndex, lessonIndex) => {
    const currentSections = getValues("sections");
    currentSections[sectionIndex].lessons = currentSections[
      sectionIndex
    ].lessons.filter((_, j) => j !== lessonIndex);
    setValue("sections", currentSections);
  };

  return {
    sectionCount,
    setSectionCount,
    lessonCount,
    setLessonCount,
    addSection,
    addLesson,
    removeSection,
    removeLesson,
  };
};
