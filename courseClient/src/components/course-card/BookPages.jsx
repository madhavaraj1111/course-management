import React from "react";
import SectionsList from "./SectionsList";
import ActionButtons from "./ActionButtons";

const BookPages = ({ course, isHovered, onEdit, onDelete, preview }) => {
  return (
    <div
      className={`absolute inset-0 bg-white rounded-r-lg shadow-lg transform transition-all duration-700 ${
        isHovered ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="h-full p-6 flex flex-col relative">
        {/* Page flutter layers */}
        <div>
          <div className="absolute inset-0 bg-white/20 rounded-r-lg transform translate-x-1 translate-y-1 rotate-1 pointer-events-none"></div>
          <div className="absolute inset-0 bg-white/10 rounded-r-lg transform translate-x-2 translate-y-2 rotate-2 pointer-events-none"></div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-300 pb-4 mb-6 relative z-10">
          <h4 className="text-lg font-bold text-gray-800 text-center">
            Course Index
          </h4>
        </div>

        {/* Sections */}
        <SectionsList sections={course.sections} />

        {/* Actions */}
        <ActionButtons 
          onEdit={onEdit}
          onDelete={onDelete}
          preview={preview}
        />

        {/* Page lines */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-red-200"></div>
        <div className="absolute left-14 top-0 bottom-0 w-px bg-blue-100"></div>
      </div>
    </div>
  );
};

export default BookPages;