import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { addCourse } from "../store/slices/coursesSlice";
import RichTextEditor from "../components/RichTextEditor";
import CourseCard from "../components/CourseCard";

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

  const [sectionCount, setSectionCount] = useState("");
  const [lessonCount, setLessonCount] = useState({});

  const titleValue = watch("title") || "";
  const descriptionValue = watch("description") || "";
  const thumbnailValue = watch("thumbnail") || "";
  const categoryValue = watch("category") || "Programming";
  const difficultyValue = watch("difficulty") || "Beginner";
  const sections = watch("sections") || [];

  // Adding Sections fields
  const addSection = () => {
    const currentSections = getValues("sections") || [];
    setValue("sections", [
      ...currentSections,
      { title: "", description: "", lessons: [] },
    ]);
  };

  // Adding lesson fields
  const addLesson = (sectionIndex) => {
    const currentSections = getValues("sections");
    currentSections[sectionIndex].lessons.push({ title: "", description: "" });
    setValue("sections", currentSections);
  };

  // Remove section
  const removeSection = (sectionIndex) => {
    const currentSections = getValues("sections");
    const newSections = currentSections.filter((_, i) => i !== sectionIndex);
    setValue("sections", newSections);
  };

  // Remove lesson
  const removeLesson = (sectionIndex, lessonIndex) => {
    const currentSections = getValues("sections");
    currentSections[sectionIndex].lessons = currentSections[
      sectionIndex
    ].lessons.filter((_, j) => j !== lessonIndex);
    setValue("sections", currentSections);
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form data:", data);
    dispatch(addCourse(data));
    navigate("/courses");
    reset();
  };

  const handleCancel = () => {
    navigate("/courses");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Course
          </h1>
          <p className="text-white/60">
            Build an engaging course with structured content and lessons
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left: Main Create Form */}
          <div className="flex-1 xl:max-w-4xl">
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Course Basic Info Section */}
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Course Information
                  </h2>

                  {/* Thumbnail Section */}
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
                        className="w-full p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
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
                          thumbnailValue ||
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
                      className="w-full text-2xl font-bold bg-white/10 text-white border border-white/20 rounded-lg p-2  placeholder:text-md outline-none   transition-all"
                      placeholder="Enter course title"
                    />
                    {errors.title && (
                      <span className="block pt-2 text-sm text-red-300">
                        {errors.title.message}
                      </span>
                    )}
                    <p className="mt-1 text-xs text-white/70">
                      {titleValue.length}/60 characters
                    </p>
                  </div>

                  {/* Category & Difficulty */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-3">
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20  outline-none transition-all"
                      >
                        <option
                          value="Programming"
                          className="bg-gray-800/90 text-white"
                        >
                          Programming
                        </option>
                        <option
                          value="Design"
                          className="bg-gray-800/90 text-white"
                        >
                          Design
                        </option>
                        <option
                          value="Business"
                          className="bg-gray-800/90 text-white"
                        >
                          Business
                        </option>
                        <option
                          value="Marketing"
                          className="bg-gray-800/90 text-white"
                        >
                          Marketing
                        </option>
                      </select>
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
                      <select
                        {...register("difficulty", {
                          required: "Difficulty is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20  outline-none transition-all"
                      >
                        <option
                          value="Beginner"
                          className="bg-gray-800/90 text-white"
                        >
                          Beginner
                        </option>
                        <option
                          value="Intermediate"
                          className="bg-gray-800/90 text-white"
                        >
                          Intermediate
                        </option>
                        <option
                          value="Advanced"
                          className="bg-gray-800/90 text-white"
                        >
                          Advanced
                        </option>
                      </select>
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

                {/* Course Content Section */}
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
                        className="w-20 px-3 py-2 rounded-lg bg-white/10 text-white border border-white/20 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        value={sectionCount || ""}
                        onChange={(e) => setSectionCount(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const count = parseInt(sectionCount || 1, 10);
                          for (let k = 0; k < count; k++) addSection();
                          setSectionCount("");
                        }}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                      >
                        + Add Section
                      </button>
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="space-y-6">
                    {sections.map((section, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-xl border border-white/10 p-6"
                      >
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-medium text-white">
                            Section {i + 1}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeSection(i)}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 cursor-pointer text-red-300 rounded-lg text-sm border border-red-400/30 transition-colors duration-200"
                          >
                            Remove Section
                          </button>
                        </div>

                        {/* Section Title */}
                        <div className="mb-4">
                          <label className="block text-white/70 text-sm font-medium mb-2">
                            Section Title
                          </label>
                          <input
                            type="text"
                            {...register(`sections.${i}.title`, {
                              required: "Section title is required",
                            })}
                            placeholder={`Enter section ${i + 1} title`}
                            className="w-full p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          />
                          {errors.sections?.[i]?.title && (
                            <span className="text-sm text-red-300">
                              {errors.sections[i].title.message}
                            </span>
                          )}
                        </div>

                        {/* Section Description */}
                        <div className="mb-6">
                          <label className="block text-white/70 text-sm font-medium mb-2">
                            Section Description
                          </label>
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
                                glassMode={true}
                              />
                            )}
                          />
                          {errors.sections?.[i]?.description && (
                            <span className="text-sm text-red-300">
                              {errors.sections[i].description.message}
                            </span>
                          )}
                        </div>

                        {/* Lessons */}
                        <div className="border-l-2 border-cyan-500/30 pl-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-medium">Lessons</h4>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                placeholder="Count"
                                className="w-16 px-2 py-1 rounded bg-white/10 text-white border border-white/20 text-xs outline-none focus:border-cyan-500 transition-all"
                                value={lessonCount[i] || ""}
                                onChange={(e) =>
                                  setLessonCount({
                                    ...lessonCount,
                                    [i]: e.target.value,
                                  })
                                }
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const count = parseInt(
                                    lessonCount[i] || 1,
                                    10
                                  );
                                  for (let k = 0; k < count; k++) addLesson(i);
                                  setLessonCount((prev) => ({
                                    ...prev,
                                    [i]: "",
                                  }));
                                }}
                                className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm font-medium transition-colors duration-200"
                              >
                                + Add Lesson
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {section.lessons?.length > 0 ? (
                              section.lessons.map((lesson, j) => (
                                <div
                                  key={j}
                                  className="bg-white/5 rounded-lg border border-white/10 p-4"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-white/70 text-sm font-medium">
                                      Lesson {j + 1}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => removeLesson(i, j)}
                                      className="px-2 py-1 bg-red-500/20 cursor-pointer hover:bg-red-500/30 text-red-300 rounded text-xs border border-red-400/30 transition-colors duration-200"
                                    >
                                      Remove
                                    </button>
                                  </div>

                                  <div className="mb-3">
                                    <input
                                      type="text"
                                      {...register(
                                        `sections.${i}.lessons.${j}.title`,
                                        {
                                          required: "Lesson title is required",
                                        }
                                      )}
                                      placeholder={`Enter lesson ${j + 1} title`}
                                      className="w-full p-2 bg-white/10 text-white border border-white/20 rounded outline-none text-sm focus:border-cyan-500 transition-all"
                                    />
                                    {errors.sections?.[i]?.lessons?.[j]
                                      ?.title && (
                                      <span className="text-sm text-red-300">
                                        {
                                          errors.sections[i].lessons[j].title
                                            .message
                                        }
                                      </span>
                                    )}
                                  </div>

                                  <div>
                                    <Controller
                                      name={`sections.${i}.lessons.${j}.description`}
                                      control={control}
                                      rules={{
                                        required:
                                          "Lesson description is required",
                                      }}
                                      render={({ field }) => (
                                        <RichTextEditor
                                          value={field.value}
                                          onChange={field.onChange}
                                          glassMode={true}
                                        />
                                      )}
                                    />
                                    {errors.sections?.[i]?.lessons?.[j]
                                      ?.description && (
                                      <span className="text-sm text-red-300">
                                        {
                                          errors.sections[i].lessons[j]
                                            .description.message
                                        }
                                      </span>
                                    )}
                                  </div>
                                </div>
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
                    ))}

                    {sections.length === 0 && (
                      <div className="text-center py-12 text-white/50 bg-white/5 rounded-xl border-2 border-dashed border-white/20">
                        <p className="text-lg mb-2">No sections yet.</p>
                        <p className="text-sm">
                          Use the "+ Add Section" button to start building your
                          course.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-white/20">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 font-semibold py-2 rounded-md shadow-sm text-white bg-cyan-700 hover:bg-cyan-600 cursor-pointer transition-colors"
                    >
                      Create Course
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Live Preview */}
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
              <CourseCard
                preview={true}
                course={{
                  title: titleValue || "Untitled Course",
                  description: descriptionValue || "No description yet...",
                  thumbnail:
                    thumbnailValue ||
                    "https://usmc.redvector.com/lpe/assets/core/img/large-placeholder-course.png",
                  category: categoryValue,
                  difficulty: difficultyValue,
                  sections: sections,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;