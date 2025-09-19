import React from "react";

const CourseDescription = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Course</h2>
      <div
        className="prose prose-gray prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: course.description }}
      />
    </div>
  );
};

export default CourseDescription;
