import { useRef, useState } from "react";

export const useNavigation = () => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set([0]));

  const sectionRefs = useRef([]);
  const lessonRefs = useRef({});

  const scrollTo = (ref) => {
    if (ref) ref.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleQuickSectionNav = (sectionIndex) => {
    setSelectedSection(sectionIndex);
    setSelectedLesson(0);
    setExpandedSections((prev) => new Set(prev).add(sectionIndex));
    scrollTo(sectionRefs.current[sectionIndex]);
  };

  const handleQuickLessonNav = (sectionIndex, lessonIndex) => {
    setSelectedSection(sectionIndex);
    setSelectedLesson(lessonIndex);
    setExpandedSections((prev) => new Set(prev).add(sectionIndex));
    scrollTo(lessonRefs.current[`${sectionIndex}-${lessonIndex}`]);
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      newSet.has(sectionIndex) ? newSet.delete(sectionIndex) : newSet.add(sectionIndex);
      return newSet;
    });
    setSelectedSection(sectionIndex);
  };

  const handleLessonSelect = (sectionIndex, lessonIndex) => {
    setSelectedSection(sectionIndex);
    setSelectedLesson(lessonIndex);
    setExpandedSections((prev) => new Set(prev).add(sectionIndex));
  };

  return {
    selectedSection,
    selectedLesson,
    expandedSections,
    sectionRefs,
    lessonRefs,
    handleQuickSectionNav,
    handleQuickLessonNav,
    toggleSection,
    handleLessonSelect,
  };
};
