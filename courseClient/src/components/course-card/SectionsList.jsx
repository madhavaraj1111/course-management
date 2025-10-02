import React from "react";

const SectionsList = ({ sections }) => {
  if (!sections?.length) {
    return (
      <div className="flex-1 overflow-y-auto space-y-4 relative z-10">
        <div className="text-sm pl-12 text-gray-600">
          There were no sections found
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 relative z-10">
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="border-l-2 border-purple-200 pl-4"
        >
          {/* Section Title with proper list structure */}
          <div className="flex items-start mb-2">
            <span className="font-semibold text-gray-800 mr-1 flex-shrink-0">
              {sectionIndex + 1}.
            </span>
            <h5 className="font-semibold text-gray-800 break-words">
              {section.title}
            </h5>
          </div>
          
          {/* Lessons List */}
          <ul className="space-y-1 ml-4">
            {section.lessons?.map((lesson, lessonIndex) => (
              <li
                key={lessonIndex}
                className="text-sm text-gray-600 flex items-start"
              >
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                <span className="break-words">{lesson.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SectionsList;