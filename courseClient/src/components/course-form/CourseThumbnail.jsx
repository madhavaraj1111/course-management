
// components/course-form/CourseThumbnail.jsx
import React from "react";

const CourseThumbnail = ({ register, errors, watchedValues }) => {
  return (
    <div className="mb-8">
      <label className="block text-white/80 text-sm font-medium mb-3">
        Course Thumbnail
      </label>
      <div className="mb-4">
        <input
          type="text"
          {...register("thumbnail", {
            required: "Thumbnail URL is required",
          })}
          className="w-full p-4 rounded-lg bg-white/10 text-white border border-white/20 outline-none transition-all"
          placeholder="Enter thumbnail URL"
        />
        {errors.thumbnail && (
          <span className="block pt-2 text-sm text-red-300">
            {errors.thumbnail.message}
          </span>
        )}
      </div>
      <div className="relative">
        <img
          src={
            watchedValues.thumbnail ||
            "https://usmc.redvector.com/lpe/assets/core/img/large-placeholder-course.png"
          }
          alt="Course thumbnail preview"
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            e.target.src =
              "https://usmc.redvector.com/lpe/assets/core/img/large-placeholder-course.png";
          }}
        />
      </div>
    </div>
  );
};

export default CourseThumbnail;