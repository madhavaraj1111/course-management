// components/course-form/CoursePreview.jsx
import React from "react";
import CourseCard from "../CourseCard";

const CoursePreview = ({ previewData }) => {
  return (
    <div className="xl:w-96 xl:sticky xl:top-8 xl:self-start">
      <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Live Preview
          </h3>
          <p className="text-white/60 text-sm">
            See how your course looks to students
          </p>
        </div>
        <CourseCard preview={true} course={previewData} />
      </div>
    </div>
  );
};

export default CoursePreview;