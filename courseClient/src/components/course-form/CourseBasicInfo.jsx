// components/course-form/CourseBasicInfo.jsx
import React from "react";
import { Controller } from "react-hook-form";
import RichTextEditor from "../RichTextEditor";
import FormSelect from "../FormSelect";
import CourseThumbnail from "./CourseThumbnail";

const CourseBasicInfo = ({ register, errors, control, watchedValues }) => {
  return (
    <div className="p-8 border-b border-white/10">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Course Information
      </h2>

      <CourseThumbnail
        register={register}
        errors={errors}
        watchedValues={watchedValues}
      />

      {/* Title Section */}
      <div className="mb-6">
        <label className="block text-white/80 text-sm font-medium mb-3">
          Course Title
        </label>
        <input
          type="text"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 10,
              message: "Title must be at least 10 characters",
            },
            maxLength: {
              value: 60,
              message: "Title should not exceed 60 characters",
            },
          })}
          className="w-full text-xl font-bold bg-white/10 text-white border border-white/20 rounded-lg p-2 outline-none transition-all"
          placeholder="Enter course title"
        />
        {errors.title && (
          <span className="block pt-2 text-sm text-red-300">
            {errors.title.message}
          </span>
        )}
        <p className="mt-1 text-xs text-white/70">
          {(watchedValues.title || "").length}/60 characters
        </p>
      </div>

      {/* Category & Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-3">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormSelect
                className="w-full"
                {...field}
                options={[
                  { label: "Programming", value: "Programming" },
                  { label: "Design", value: "Design" },
                  { label: "Business", value: "Business" },
                  { label: "Marketing", value: "Marketing" },
                  { label: "Data Science", value: "Data Science" },
                ]}
                placeholder="Select Category"
              />
            )}
          />
          {errors.category && (
            <span className="block pt-2 text-sm text-red-300">
              {errors.category.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-white/80 text-sm font-medium mb-3">
            Difficulty
          </label>
          <Controller
            name="difficulty"
            control={control}
            rules={{ required: "Difficulty is required" }}
            render={({ field }) => (
              <FormSelect
                className="w-full"
                {...field}
                options={[
                  { label: "Beginner", value: "Beginner" },
                  { label: "Intermediate", value: "Intermediate" },
                  { label: "Advanced", value: "Advanced" },
                ]}
                placeholder="Select Difficulty"
              />
            )}
          />
          {errors.difficulty && (
            <span className="block pt-2 text-sm text-red-300">
              {errors.difficulty.message}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <label className="block text-white/80 text-sm font-medium mb-3">
          Course Description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              glassMode={true}
            />
          )}
        />
        {errors.description && (
          <span className="block pt-2 text-sm text-red-300">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default CourseBasicInfo;
