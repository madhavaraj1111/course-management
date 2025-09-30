import React from "react";

const QuickNavigation = ({
  course,
  isMobile,
  selectedSection,
  selectedLesson,
  handleQuickSectionNav,
  handleQuickLessonNav,
  totalLessons,
  isLessonCompleted,
}) => {
  // Check if all lessons in a section are completed
  const isSectionCompleted = (section) => {
    if (!section.lessons || section.lessons.length === 0) return false;
    return section.lessons.every((lesson) =>
      isLessonCompleted(section._id, lesson._id)
    );
  };

  return (
    <div className={`${isMobile ? "lg:hidden" : "hidden lg:block"}`}>
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-24">
        <h3 className="text-lg text-gray-900 mb-6 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
            />
          </svg>
          Quick Navigation
        </h3>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {course.sections?.map((section, sectionIndex) => {
            const sectionCompleted = isSectionCompleted(section);
            const isSelected = selectedSection === sectionIndex;

            return (
              <div
                key={sectionIndex}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  className={`w-full text-left p-4 font-medium rounded-t-lg border-b border-gray-200 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-purple-50 text-purple-900"
                      : sectionCompleted
                        ? "bg-green-50 text-green-900 hover:bg-green-100"
                        : "text-gray-900 hover:bg-purple-50"
                  }`}
                  onClick={() => handleQuickSectionNav(sectionIndex)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {sectionCompleted && (
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
                      )}
                      <span className="text-sm">
                        Section {sectionIndex + 1}: {section.title}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        sectionCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {section.lessons?.length || 0}
                    </span>
                  </div>
                </button>

                {isSelected && (
                  <div className="p-2 bg-gray-50">
                    {section.lessons?.map((lesson, lessonIndex) => {
                      const isCompleted = isLessonCompleted(
                        section._id,
                        lesson._id
                      );
                      const isLessonSelected = selectedLesson === lessonIndex;

                      return (
                        <button
                          key={lessonIndex}
                          className={`w-full text-left p-3 text-sm rounded hover:bg-white hover:shadow-sm cursor-pointer ${
                            isLessonSelected
                              ? "bg-white shadow-sm border-l-2 border-purple-500"
                              : isCompleted
                                ? "hover:border-l-2 hover:border-green-600"
                                : "hover:border-l-2 hover:border-purple-300"
                          }`}
                          onClick={() =>
                            handleQuickLessonNav(sectionIndex, lessonIndex)
                          }
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isLessonSelected
                                  ? "bg-purple-500"
                                  : isCompleted
                                    ? "bg-green-600"
                                    : "bg-gray-300"
                              }`}
                            />
                            <span className="text-gray-700">
                              {lesson.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isMobile && course.sections?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p className="font-medium">Course Overview</p>
              <div className="mt-2 flex justify-between text-xs">
                <span>{course.sections.length} sections</span>
                <span>{totalLessons} lessons</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickNavigation;
