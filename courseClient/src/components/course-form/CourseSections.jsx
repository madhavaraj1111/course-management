// components/course-form/CourseSections.jsx
import React from "react";
import Button from "../Button";
import SectionItem from "./SectionItem";

const CourseSections = ({ 
  register, 
  control, 
  errors, 
  sections,
  sectionManager 
}) => {
  const {
    sectionCount,
    setSectionCount,
    lessonCount,
    setLessonCount,
    addSection,
    addLesson,
    removeSection,
    removeLesson,
  } = sectionManager;

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Course Content
          </h2>
          <p className="text-white/60">
            Organize your course into sections and lessons
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            min="1"
            placeholder="Count"
            className="w-20 px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm outline-none transition-all"
            value={sectionCount || ""}
            onChange={(e) => setSectionCount(e.target.value)}
          />
          <Button onClick={addSection} variant="primary" size="sm">
            + Add Section
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <SectionItem
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            register={register}
            control={control}
            errors={errors}
            lessonCount={lessonCount}
            setLessonCount={setLessonCount}
            onRemoveSection={removeSection}
            onAddLesson={addLesson}
            onRemoveLesson={removeLesson}
          />
        ))}

        {sections.length === 0 && (
          <div className="text-center py-12 text-white/50 bg-white/5 rounded-xl border-2 border-dashed border-white/20">
            <p className="text-lg mb-2">No sections yet.</p>
            <p className="text-sm">
              Use the "+ Add Section" button to start building your course.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSections;