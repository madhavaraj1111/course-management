import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { addCourse } from "../store/slices/coursesSlice";
import RichTextEditor from "../components/RichTextEditor";
import store from "../store";

const CourseCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: { sections: [] },
  });

  const titleValue = watch("title") || "";
  const sections = watch("sections") || [];

  // Adding Sections fields using this
  const addSection = () => {
    const currentSections = getValues("sections") || [];
    setValue("sections", [
      ...currentSections,
      { title: "", description: "", lessons: [] },
    ]);
  };

  // Adding lesson fields using this
  const addLesson = (sectionIndex) => {
    const currentSections = getValues("sections");
    currentSections[sectionIndex].lessons.push({ title: "", description: "" });
    setValue("sections", currentSections);
  };

  // This handles the submitted data
  const onSubmit = (data) => {
    console.log("Form data:", data);
    dispatch(addCourse(data));
    navigate("/courses");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Course
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill out the form below to create a new course
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
            {/* Basic Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h2>

              {/* Title */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a compelling title (10-60 characters)"
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.title && (
                    <span className="block pt-2 text-sm text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                  {/* Title length */}
                  <p className="mt-1 text-xs text-gray-500">
                    {titleValue.length}/60 characters
                  </p>
                </div>

                {/* Course Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.description && (
                    <span className="block pt-2 text-sm text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    placeholder="Paste your image URL here"
                    {...register("thumbnail", {
                      required: "Thumbnail is required",
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {errors.thumbnail && (
                    <span className="block pt-2 text-sm text-red-500">
                      {errors.thumbnail.message}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  {errors.category && (
                    <span className="block pt-2 text-sm text-red-500">
                      {errors.category.message}
                    </span>
                  )}
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    {...register("difficulty", {
                      required: "Difficulty is required",
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  {errors.difficulty && (
                    <span className="block pt-2 text-sm text-red-500">
                      {errors.difficulty.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Sections & Lessons */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700">
                  Course Content
                </h2>
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Section
                </button>
              </div>

              {sections.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No sections yet
                  </h3>
                </div>
              ) : (
                <div className="space-y-4">
                  {sections.map((section, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800">
                          Section {i + 1}
                        </h3>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Section Title */}
                        <input
                          type="text"
                          placeholder="Section Title"
                          {...register(`sections.${i}.title`, {
                            required: "Section title is required",
                          })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                        />
                        {errors.sections?.[i]?.title && (
                          <span className="text-sm text-red-500">
                            {errors.sections[i].title.message}
                          </span>
                        )}

                        {/* Section Description */}
                        <Controller
                          name={`sections.${i}.description`}
                          control={control}
                          rules={{
                            required: "Section description is required",
                          }}
                          render={({ field }) => (
                            <RichTextEditor
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.sections?.[i]?.description && (
                          <span className="text-sm text-red-500">
                            {errors.sections[i].description.message}
                          </span>
                        )}

                        {/* Lessons */}
                        <button
                          type="button"
                          onClick={() => addLesson(i)}
                          className="inline-flex items-center px-3 py-1.5 border text-xs rounded-md bg-indigo-600 text-white"
                        >
                          Add Lesson
                        </button>

                        {section.lessons.map((lesson, j) => (
                          <div
                            key={j}
                            className="bg-white rounded-lg border p-4"
                          >
                            {/* Lesson Title */}
                            <input
                              type="text"
                              placeholder="Lesson Title"
                              {...register(`sections.${i}.lessons.${j}.title`, {
                                required: "Lesson title is required",
                              })}
                              className="block w-full rounded-md border px-3 py-2 mb-2"
                            />
                            {errors.sections?.[i]?.lessons?.[j]?.title && (
                              <span className="text-sm text-red-500">
                                {errors.sections[i].lessons[j].title.message}
                              </span>
                            )}

                            {/* Lesson description */}
                            <Controller
                              name={`sections.${i}.lessons.${j}.description`}
                              control={control}
                              rules={{
                                required: "Lesson description is required",
                              }}
                              render={({ field }) => (
                                <RichTextEditor
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.sections?.[i]?.lessons?.[j]
                              ?.description && (
                              <span className="text-sm text-red-500">
                                {
                                  errors.sections[i].lessons[j].description
                                    .message
                                }
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Action */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
