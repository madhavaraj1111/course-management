// components/course-form/SectionItem.jsx
import React from "react";
import { Controller } from "react-hook-form";
import Button from "../common/Button";
import RichTextEditor from "../RichTextEditor";
import LessonItem from "./LessonItem";

const SectionItem = ({ 
  section, 
  sectionIndex, 
  register, 
  control, 
  errors,
  lessonCount,
  setLessonCount,
  onRemoveSection,
  onAddLesson,
  onRemoveLesson
}) => {
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">
          Section {sectionIndex + 1}
        </h3>
        <Button
          onClick={() => onRemoveSection(sectionIndex)}
          variant="danger"
          size="sm"
        >
          Remove Section
        </Button>
      </div>

      {/* Section Title */}
      <div className="mb-4">
        <label className="block text-white/70 text-sm font-medium mb-2">
          Section Title
        </label>
        <input
          type="text"
          {...register(`sections.${sectionIndex}.title`, {
            required: "Section title is required",
          })}
          placeholder={`Enter section ${sectionIndex + 1} title`}
          className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none transition-all"
        />
        {errors.sections?.[sectionIndex]?.title && (
          <span className="text-sm text-red-300">
            {errors.sections[sectionIndex].title.message}
          </span>
        )}
      </div>

      {/* Section Description */}
      <div className="mb-6">
        <label className="block text-white/70 text-sm font-medium mb-2">
          Section Description
        </label>
        <Controller
          name={`sections.${sectionIndex}.description`}
          control={control}
          rules={{ required: "Section description is required" }}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              glassMode={true}
            />
          )}
        />
        {errors.sections?.[sectionIndex]?.description && (
          <span className="text-sm text-red-300">
            {errors.sections[sectionIndex].description.message}
          </span>
        )}
      </div>

      {/* Lessons */}
      <div className="border-l-2 border-cyan-500/30 pl-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h4 className="text-white font-medium">Lessons</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              placeholder="Count"
              className="w-16 px-2 py-1 rounded bg-white/10 text-white border border-white/20 text-xs outline-none transition-all"
              value={lessonCount[sectionIndex] || ""}
              onChange={(e) =>
                setLessonCount({
                  ...lessonCount,
                  [sectionIndex]: e.target.value,
                })
              }
            />
            <Button
              onClick={() => onAddLesson(sectionIndex)}
              variant="primary"
              size="sm"
            >
              + Add Lesson
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {section.lessons?.length > 0 ? (
            section.lessons.map((lesson, lessonIndex) => (
              <LessonItem
                key={lessonIndex}
                lesson={lesson}
                lessonIndex={lessonIndex}
                sectionIndex={sectionIndex}
                register={register}
                control={control}
                errors={errors}
                onRemove={onRemoveLesson}
              />
            ))
          ) : (
            <div className="text-center py-8 text-white/50 bg-white/5 rounded-lg border-2 border-dashed border-white/20">
              <p className="text-sm">No lessons yet.</p>
              <p className="text-xs mt-1">
                Use the "+ Add Lesson" button to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionItem;