import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../store/slices/coursesSlice";
import RichTextEditor from "../components/RichTextEditor";

const CourseCreate = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [sections, setSections] = useState([]);

  // Adding Sections fields using this
  const addSection = () => {
    setSections([...sections, { title: "", description: "", lessons: [] }]);
  };

  // Adding lesson fields using this
  const addLesson = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.push({ title: "", description: "" });
    setSections(updatedSections);
  };

  // This handles the submitted data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 10 || title.length > 60) {
      alert("Title must be 10-60 characters");
      return;
    }

    const course = {
      title,
      description,
      thumbnail,
      category,
      difficulty,
      sections,
    };

    // Adding course using dispatch
    dispatch(addCourse(course));

    // Resetting form fields
    setTitle("");
    setDescription("");
    setThumbnail("");
    setCategory("");
    setDifficulty("Beginner");
    setSections([]);
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

          <form onSubmit={handleSubmit} className="px-6 py-6">
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {title.length}/60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <RichTextEditor
                    value={description}
                    onChange={setDescription}
                  />
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
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sections & Lessons */}
            <div className="mb-8">
              {/* Add section */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700">
                  Course Content
                </h2>
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Section
                </button>
              </div>

              {sections.length === 0 ? (
                // Show No sections if not Clicked Add sections
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No sections yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating your first section.
                  </p>
                </div>
              ) : (
                // Show sections fields if have clicked
                <div className="space-y-4">
                  {/* Sections Adding */}
                  {sections.map((section, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800">
                          Section {i + 1}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {section.lessons.length}{" "}
                          {section.lessons.length === 1 ? "lesson" : "lessons"}
                        </span>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Section Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Title
                          </label>
                          <input
                            type="text"
                            placeholder="Section Title"
                            value={section.title}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[i].title = e.target.value;
                              setSections(updated);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Section Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Description
                          </label>
                          <RichTextEditor
                            value={section.description}
                            onChange={(val) => {
                              const updated = [...sections];
                              updated[i].description = val;
                              setSections(updated);
                            }}
                          />
                        </div>

                        <div>
                          {/* Add lesson button*/}
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-700">
                              Lessons
                            </h4>
                            <button
                              type="button"
                              onClick={() => addLesson(i)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <svg
                                className="-ml-0.5 mr-1 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Add Lesson
                            </button>
                          </div>

                          {/* Lessons Adding */}
                          {section.lessons.length === 0 ? (
                            // Show No lessons if not Clicked Add lessons
                            <div className="text-center py-4 bg-white rounded-lg border-2 border-dashed border-gray-300">
                              <p className="text-sm text-gray-500">
                                No lessons in this section yet
                              </p>
                            </div>
                          ) : (
                            // Show lessons fields if Add Lessons clicked
                            <div className="space-y-3">
                              {section.lessons.map((lesson, j) => (
                                <div
                                  key={j}
                                  className="bg-white rounded-lg border border-gray-200 p-4"
                                >
                                  <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1.5 mr-3">
                                      {/* Lesson count */}
                                      <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <span className="text-xs font-medium text-indigo-800">
                                          {j + 1}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      {/* Lesson title */}
                                      <input
                                        type="text"
                                        placeholder="Lesson Title"
                                        value={lesson.title}
                                        onChange={(e) => {
                                          const updated = [...sections];
                                          updated[i].lessons[j].title =
                                            e.target.value;
                                          setSections(updated);
                                        }}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mb-2"
                                      />

                                      {/* Lesson description */}
                                      <RichTextEditor
                                        value={lesson.description}
                                        onChange={(val) => {
                                          const updated = [...sections];
                                          updated[i].lessons[j].description =
                                            val;
                                          setSections(updated);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Action */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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