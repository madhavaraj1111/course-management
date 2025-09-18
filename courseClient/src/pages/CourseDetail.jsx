import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCourse, selectCourse } from "../store/slices/coursesSlice";
import Button from "../components/Button";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list) || [];
  
  const [course, setCourse] = useState(null);
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set([0])); // Track expanded sections
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (!courseId || courseId === "undefined") {
      navigate("/courses");
      return;
    }

    const courseIndex = parseInt(courseId, 10);
    if (isNaN(courseIndex) || courseIndex < 0) {
      navigate("/courses");
      return;
    }

    const foundCourse = courses[courseIndex];
    if (foundCourse) {
      setCourse(foundCourse);
      setLoading(false);
    } else {
      navigate("/courses");
    }
  }, [courseId, courses, navigate]);

  const handleEdit = () => {
    const courseIndex = parseInt(courseId, 10);
    if (isNaN(courseIndex)) {
      navigate("/courses");
      return;
    }
    dispatch(selectCourse({ course, index: courseIndex }));
    navigate("/courses/update");
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      const courseIndex = parseInt(courseId, 10);
      if (isNaN(courseIndex)) {
        navigate("/courses");
        return;
      }
      dispatch(deleteCourse(courseIndex));
      navigate("/courses");
    }
  };

  const handleBack = () => {
    navigate("/courses");
  };

  const toggleSection = (sectionIndex) => {
    const newExpandedSections = new Set(expandedSections);
    if (newExpandedSections.has(sectionIndex)) {
      newExpandedSections.delete(sectionIndex);
    } else {
      newExpandedSections.add(sectionIndex);
    }
    setExpandedSections(newExpandedSections);
    setSelectedSection(sectionIndex);
  };

  const handleLessonSelect = (sectionIndex, lessonIndex) => {
    setSelectedSection(sectionIndex);
    setSelectedLesson(lessonIndex);
    // Ensure the section is expanded when a lesson is selected
    const newExpandedSections = new Set(expandedSections);
    newExpandedSections.add(sectionIndex);
    setExpandedSections(newExpandedSections);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800 border-green-200",
      Intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Advanced: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Programming: "bg-blue-100 text-blue-800 border-blue-200",
      Design: "bg-purple-100 text-purple-800 border-purple-200",
      Marketing: "bg-pink-100 text-pink-800 border-pink-200",
      Business: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const totalLessons = course?.sections?.reduce(
    (total, section) => total + (section.lessons?.length || 0),
    0
  ) || 0;

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const currentSection = Array.isArray(course.sections) && course.sections.length > selectedSection
    ? course.sections[selectedSection]
    : null;

  const currentLesson = currentSection &&
    Array.isArray(currentSection.lessons) &&
    currentSection.lessons.length > selectedLesson
    ? currentSection.lessons[selectedLesson]
    : null;

  return (
    <div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0; 
            max-height: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            max-height: 1000px; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-in-out;
        }
      `}</style>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-cyan-950 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleBack}
                variant="ghost"
                className="flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Courses</span>
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button onClick={handleEdit} variant="primary" className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Course</span>
              </Button>

              <Button onClick={handleDelete} variant="danger" className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-80 h-48 rounded-lg overflow-hidden shadow-md">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(course.category)}`}>
                      {course.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 7a2 2 0 012-2h10a2 2 0 012 2v2M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" />
                      </svg>
                      <span>{course.sections?.length || 0} Sections</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>{totalLessons} Lessons</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Course</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>



            {/* Course Structure */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Structure</h2>
              <p className="text-gray-600 mb-6">
                {course.sections?.length || 0} sections - {totalLessons} lectures
              </p>
              
              <div className="space-y-4">
                {course.sections?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      className={`w-full text-left p-4 font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-[1.01] ${
                        selectedSection === sectionIndex ? "bg-gray-50" : ""
                      }`}
                      onClick={() => toggleSection(sectionIndex)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">
                          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedSections.has(sectionIndex) ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
                          </svg>
                          {section.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {section.lessons?.length || 0} lectures
                        </span>
                      </div>
                    </button>

                    {expandedSections.has(sectionIndex) && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        {/* Section Description */}
                        {section.description && (
                          <div className="mb-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                            <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.description }} />
                          </div>
                        )}
                        
                        {/* Lessons */}
                        <div className="space-y-3">
                          {section.lessons?.map((lesson, lessonIndex) => (
                            <button
                              key={lessonIndex}
                              onClick={() => handleLessonSelect(sectionIndex, lessonIndex)}
                              className={`w-full text-left bg-white rounded border border-gray-200 p-4 transition-all duration-200 hover:shadow-md hover:border-purple-300 cursor-pointer ${
                                selectedSection === sectionIndex && selectedLesson === lessonIndex 
                                  ? "border-l-4 border-l-purple-500 bg-purple-50 shadow-sm" 
                                  : "hover:bg-purple-25"
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                                  selectedSection === sectionIndex && selectedLesson === lessonIndex
                                    ? "bg-purple-100"
                                    : "bg-gray-100"
                                }`}>
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M12 7a4 4 0 11-4 4V7z" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-gray-900 font-medium mb-2">{lesson.title}</h4>
                                  {lesson.description && (
                                    <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: lesson.description }} />
                                  )}
                                  {selectedSection === sectionIndex && selectedLesson === lessonIndex && lesson.content && (
                                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                                      <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          )) || (
                            <div className="text-center py-4 text-gray-500 italic">
                              No lessons in this section
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    <p>No curriculum available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Quick Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Quick Navigation
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {course.sections?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      className={`w-full text-left p-4 font-medium text-gray-900 hover:bg-purple-50 rounded-t-lg border-b border-gray-200 transition-all duration-200 cursor-pointer ${
                        selectedSection === sectionIndex ? "bg-purple-50 text-purple-900" : ""
                      }`}
                      onClick={() => {
                        setSelectedSection(sectionIndex);
                        setSelectedLesson(0);
                        // Ensure section is expanded in main content
                        const newExpandedSections = new Set(expandedSections);
                        newExpandedSections.add(sectionIndex);
                        setExpandedSections(newExpandedSections);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          Section {sectionIndex + 1}: {section.title}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {section.lessons?.length || 0}
                        </span>
                      </div>
                    </button>

                    {selectedSection === sectionIndex && (
                      <div className="p-2 bg-gray-50 transition-all duration-300 ease-in-out animate-slideDown">
                        {section.lessons?.map((lesson, lessonIndex) => (
                          <button
                            key={lessonIndex}
                            className={`w-full text-left p-3 text-sm rounded transition-all duration-300 ease-in-out hover:bg-white hover:shadow-sm cursor-pointer transform hover:translate-x-1 ${
                              selectedLesson === lessonIndex
                                ? "bg-white shadow-sm border-l-2 border-purple-500 translate-x-1"
                                : "hover:border-l-2 hover:border-purple-300"
                            }`}
                            onClick={() => handleLessonSelect(sectionIndex, lessonIndex)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  selectedLesson === lessonIndex
                                    ? "bg-purple-500"
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              <span className="text-gray-700">
                                {lesson.title}
                              </span>
                            </div>
                          </button>
                        )) || (
                          <div className="p-3 text-sm text-gray-500 italic">
                            No lessons in this section
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p>No curriculum available</p>
                    <p className="text-sm">Add sections and lessons to this course</p>
                  </div>
                )}
              </div>

              {course.sections?.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600">
                    <p className="font-medium">Course Overview</p>
                    <div className="mt-2 flex justify-between text-xs">
                      <span>{course.sections.length} sections</span>
                      <span>{totalLessons} lessons</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CourseDetail;