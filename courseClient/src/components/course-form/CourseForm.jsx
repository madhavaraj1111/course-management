// components/course-form/CourseForm.jsx
import React from "react";
import Button from "../Button";
import CourseBasicInfo from "./CourseBasicInfo";
import CourseSections from "./CourseSections";
import CoursePreview from "./CoursePreview";
import { useCourseForm } from "./hooks/useCourseForm";
import { useSectionManager } from "./hooks/useSectionManager";
import { useFormPreview } from "./hooks/useFormPreview";

const CourseForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  mode = "create",
  loading = false,
}) => {
  const { form, handleFormSubmit } = useCourseForm(initialData, mode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
  } = form;

  const sectionManager = useSectionManager(setValue, getValues);
  const watchedValues = watch();
  const { previewData } = useFormPreview(watchedValues);
  const sections = watchedValues.sections || [];
  const isCreate = mode === "create";

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-2xl font-bold text-white mb-2">
            {isCreate ? "Create New Course" : "Edit Course"}
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            {isCreate
              ? "Build an engaging course with structured content and lessons"
              : "Make changes to your course content and structure"}
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Left: Main Form */}
          <div className="w-full lg:flex-1 lg:max-w-3xl">
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <form
                onSubmit={handleSubmit((data) =>
                  handleFormSubmit(data, onSubmit)
                )}
              >
                <CourseBasicInfo
                  register={register}
                  errors={errors}
                  control={control}
                  watchedValues={watchedValues}
                />

                <CourseSections
                  register={register}
                  control={control}
                  errors={errors}
                  sections={sections}
                  sectionManager={sectionManager}
                />

                {/* Save/Cancel Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 px-6 sm:px-8 pb-6 sm:pb-8 border-t border-white/20">
                  <Button
                    type="button"
                    onClick={onCancel}
                    variant="glass"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading
                      ? "Saving..."
                      : isCreate
                        ? "Create Course"
                        : "Update Course"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="w-full lg:max-w-sm mx-auto lg:mx-0 lg:sticky lg:top-24 self-start">
            <CoursePreview previewData={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;