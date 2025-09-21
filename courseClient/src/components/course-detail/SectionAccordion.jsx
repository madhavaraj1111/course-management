import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCourse } from "../../store/slices/coursesSlice";

const SectionAccordion = ({
  course,
  section,
  sectionIndex,
  selectedSection,
  selectedLesson,
  expandedSections,
  sectionRefs,
  lessonRefs,
  toggleSection,
  handleLessonSelect,
}) => {
  const courses = useSelector((state) => state.courses.list);
  const courseIndex = courses.findIndex((c, index) => {
    return c.courseId == course.courseId;
  });

  const dispatch = useDispatch();
  const handleRead = (course, sectionIndex, lessonIndex) => {
    const updatedCourse = JSON.parse(JSON.stringify(course));
    const section = updatedCourse.sections[sectionIndex];
    section.lessons[lessonIndex].readLesson = true;
    dispatch(updateCourse({ index: courseIndex, updatedCourse }));
  };

  const isSectionRead = section.lessons.every((lesson) => lesson.readLesson);

  return (
    <div
      className="border border-gray-200 rounded-lg"
      ref={(el) => (sectionRefs.current[sectionIndex] = el)}
    >
      <button
        className={`w-full text-left p-4 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all cursor-pointer ${
          selectedSection === sectionIndex ? "bg-gray-50" : ""
        }`}
        onClick={() => {
          toggleSection(sectionIndex);
        }}
      >
        <div className="flex items-center justify-between">
          {isSectionRead ? (
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 inline mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  expandedSections.has(sectionIndex)
                    ? "M19 9l-7 7-7-7"
                    : "M9 5l7 7-7 7"
                }
              />
            </svg>
          )}
          <span className="text-sm"> {section.title}</span>
          <span className="text-xs text-gray-500">
            {section.lessons?.length || 0} lessons
          </span>
        </div>
      </button>

      {expandedSections.has(sectionIndex) && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {section.description && (
            <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400 text-sm/7">
              <div
                className="prose prose-xs max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            </div>
          )}

          <div className="space-y-3">
            {section.lessons?.map((lesson, lessonIndex) => (
              <button
                key={lessonIndex}
                ref={(el) =>
                  (lessonRefs.current[`${sectionIndex}-${lessonIndex}`] = el)
                }
                onClick={() => {
                  handleLessonSelect(sectionIndex, lessonIndex);
                  handleRead(course, sectionIndex, lessonIndex);
                }}
                className={`w-full text-left bg-white rounded border border-gray-200 p-3 sm:p-4  transition-all hover:shadow-md hover:border-purple-300 cursor-pointer ${
                  selectedSection === sectionIndex &&
                  selectedLesson === lessonIndex
                    ? "border-l-4 border-purple-500 bg-purple-50 shadow-sm"
                    : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mt-1 ${
                      selectedSection === sectionIndex &&
                      selectedLesson === lessonIndex
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {section.lessons[lessonIndex].readLesson ? (
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6.98 21q-.816 0-1.398-.541Q5 19.917 5 19.119V5.766q0-.778.53-1.364t1.306-.748l8.78-1.854v14.616l-8.86 1.919q-.302.069-.529.276q-.227.206-.227.508q0 .39.292.636t.689.245H18V5h1v16zm.405-3.81l1-.207V4.36l-1 .207z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 ">
                    <h4 className="text-gray-900 font-medium mb-2">
                      {lesson.title}
                    </h4>
                    {lesson.description && (
                      <div
                        className="prose prose-xs max-w-none text-gray-600 text-sm/7"
                        dangerouslySetInnerHTML={{ __html: lesson.description }}
                      />
                    )}
                    {selectedSection === sectionIndex &&
                      selectedLesson === lessonIndex &&
                      lesson.content && (
                        <div className="mt-4 p-3 sm:p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                          <div
                            className="prose prose-xs max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionAccordion;
