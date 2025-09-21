import React from "react";

const QuickNavigation = ({
  course,
  isMobile,
  selectedSection,
  selectedLesson,
  handleQuickSectionNav,
  handleQuickLessonNav,
  totalLessons,
}) => {
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
          {course.sections?.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="border border-gray-200 rounded-lg"
            >
              <button
                className={`w-full text-left p-4 font-medium text-gray-900 hover:bg-purple-50 rounded-t-lg border-b border-gray-200 cursor-pointer ${
                  selectedSection === sectionIndex
                    ? "bg-purple-50 text-purple-900"
                    : ""
                }`}
                onClick={() => handleQuickSectionNav(sectionIndex)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Section {sectionIndex + 1}: {section.title}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {section.lessons?.length || 0}
                  </span>
                </div>
              </button>

              {selectedSection === sectionIndex && (
                <div className="p-2 bg-gray-50">
                  {section.lessons?.map((lesson, lessonIndex) => (
                    <button
                      key={lessonIndex}
                      className={`w-full text-left p-3 text-sm rounded hover:bg-white hover:shadow-sm cursor-pointer ${
                        selectedLesson === lessonIndex
                          ? "bg-white shadow-sm border-l-2 border-purple-500"
                          : section.lessons[lessonIndex]?.readLesson
                            ? "hover:border-l-2 hover:border-green-600"
                            : "hover:border-l-2 hover:border-purple-300"
                      }`}
                      onClick={() =>
                        handleQuickLessonNav(sectionIndex, lessonIndex)
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${selectedLesson === lessonIndex ? "bg-purple-500" : section.lessons[lessonIndex]?.readLesson ? "bg-green-600" : "bg-gray-300"}`}
                        />
                        <span className="text-gray-700">{lesson.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
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
