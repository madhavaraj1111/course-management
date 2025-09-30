// components/course-form/LessonItem.jsx
import React from "react";
import { Controller } from "react-hook-form";
import Button from "../Button";
import RichTextEditor from "../RichTextEditor";

const LessonItem = ({
  lesson,
  lessonIndex,
  sectionIndex,
  register,
  control,
  errors,
  onRemove,
}) => {
  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/70 text-sm font-medium">
          Lesson {lessonIndex + 1}
        </span>
        <Button
          onClick={() => onRemove(sectionIndex, lessonIndex)}
          variant="danger"
          size="sm"
        >
          Remove
        </Button>
      </div>

      {/* Lesson Title */}
      <div className="mb-3">
        <label className="block text-white/60 text-xs mb-1">Title</label>
        <input
          type="text"
          {...register(
            `sections.${sectionIndex}.lessons.${lessonIndex}.title`,
            {
              required: "Lesson title is required",
            }
          )}
          placeholder={`Enter lesson ${lessonIndex + 1} title`}
          className="w-full p-2 bg-white/10 text-white border border-white/20 rounded outline-none text-sm transition-all"
        />
        {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]?.title && (
          <span className="text-sm text-red-300">
            {errors.sections[sectionIndex].lessons[lessonIndex].title.message}
          </span>
        )}
      </div>

      {/* Lesson Description */}
      <div>
        <label className="block text-white/60 text-xs mb-1">Description</label>
        <Controller
          name={`sections.${sectionIndex}.lessons.${lessonIndex}.description`}
          control={control}
          rules={{ required: "Lesson description is required" }}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              glassMode={true}
            />
          )}
        />
        {errors.sections?.[sectionIndex]?.lessons?.[lessonIndex]
          ?.description && (
          <span className="text-sm text-red-300">
            {
              errors.sections[sectionIndex].lessons[lessonIndex].description
                .message
            }
          </span>
        )}
      </div>
    </div>
  );
};

export default LessonItem;