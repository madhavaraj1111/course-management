import React from "react";
import SectionAccordion from "./SectionAccordion";

const CourseStructure = ({
  course,
  selectedSection,
  selectedLesson,
  expandedSections,
  sectionRefs,
  lessonRefs,
  toggleSection,
  handleLessonSelect,
}) => {
  const totalLessons =
    course?.sections?.reduce(
      (total, section) => total + (section.lessons?.length || 0),
      0
    ) || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Course Structure
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        {course.sections?.length || 0} sections - {totalLessons} lessons
      </p>

      <div className="space-y-4">
        {course.sections?.map((section, sectionIndex) => (
          <SectionAccordion
            course={course}
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            selectedSection={selectedSection}
            selectedLesson={selectedLesson}
            expandedSections={expandedSections}
            sectionRefs={sectionRefs}
            lessonRefs={lessonRefs}
            toggleSection={toggleSection}
            handleLessonSelect={handleLessonSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseStructure;
