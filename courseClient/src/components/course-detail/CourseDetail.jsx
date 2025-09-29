import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth, apiRequest } from "../../contexts/AuthContext";
import { useNavigation } from "./hooks/useNavigation";
import { useResponsiveLayout } from "./hooks/useResponsiveLayout";

import CourseHeader from "./CourseHeader";
import CourseDescription from "./CourseDescription";
import CourseStructure from "./CourseStructure";
import QuickNavigation from "./QuickNavigation";
import CourseMeta from "./CourseMeta";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    selectedSection,
    selectedLesson,
    expandedSections,
    sectionRefs,
    lessonRefs,
    handleQuickSectionNav,
    handleQuickLessonNav,
    toggleSection,
    handleLessonSelect,
  } = useNavigation();

  const { isMobile } = useResponsiveLayout();

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const data = await apiRequest(`/courses/${courseId}`);

      setCourse(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Course not found");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Fixed: Use correct route
    navigate("/courses");
  };

  const handleEdit = () => {
    navigate(`/admin/courses/${courseId}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      try {
        await apiRequest(`/admin/courses/${courseId}`, { method: "DELETE" });
        navigate("/courses");
      } catch (error) {
        alert("Error deleting course: " + error.message);
      }
    }
  };

  const handleEnroll = async () => {
    try {
      await apiRequest(`/courses/${courseId}/enroll`, { method: "POST" });
      await fetchCourse(); // Refresh course data
      alert("Enrolled successfully!");
    } catch (error) {
      alert("Error enrolling: " + error.message);
    }
  };

  const handleLessonComplete = async (sectionId, lessonId) => {
    try {
      await apiRequest(
        `/courses/${courseId}/lessons/${sectionId}/${lessonId}/complete`,
        {
          method: "POST",
        }
      );
      await fetchCourse(); // Refresh to update progress
    } catch (error) {
      console.error("Error marking lesson complete:", error);
    }
  };

  // Helper function to check if lesson is completed
  const isLessonCompleted = (sectionId, lessonId) => {
    if (!course.progress || !Array.isArray(course.progress)) return false;
    return course.progress.some(
      (p) =>
        p.sectionId.toString() === sectionId.toString() &&
        p.lessonId.toString() === lessonId.toString()
    );
  };

  const totalLessons =
    course?.sections?.reduce(
      (acc, section) => acc + (section.lessons?.length || 0),
      0
    ) || 0;

  // Fixed: Use actual progress array length from backend
  const completedLessons = course?.progress?.length || 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <CourseHeader
        course={course}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        progressPercent={progressPercent}
        userRole={user?.role}
        isEnrolled={course.isEnrolled}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEnroll={handleEnroll}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 lg:order-2 hidden lg:block">
            <QuickNavigation
              course={course}
              isMobile={isMobile}
              selectedSection={selectedSection}
              selectedLesson={selectedLesson}
              handleQuickSectionNav={handleQuickSectionNav}
              handleQuickLessonNav={handleQuickLessonNav}
              totalLessons={totalLessons}
              userRole={user?.role}
              isEnrolled={course.isEnrolled}
              isLessonCompleted={isLessonCompleted}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 w-full max-w-4xl lg:order-1">
            <CourseMeta
              course={course}
              totalLessons={totalLessons}
              progressPercent={progressPercent}
              userRole={user?.role}
              isEnrolled={course.isEnrolled}
            />

            <CourseDescription course={course} />

            <div className="block lg:hidden">
              <QuickNavigation
                course={course}
                isMobile={isMobile}
                selectedSection={selectedSection}
                selectedLesson={selectedLesson}
                handleQuickSectionNav={handleQuickSectionNav}
                handleQuickLessonNav={handleQuickLessonNav}
                totalLessons={totalLessons}
                userRole={user?.role}
                isEnrolled={course.isEnrolled}
                isLessonCompleted={isLessonCompleted}
              />
            </div>

            <CourseStructure
              course={course}
              selectedSection={selectedSection}
              selectedLesson={selectedLesson}
              expandedSections={expandedSections}
              sectionRefs={sectionRefs}
              lessonRefs={lessonRefs}
              toggleSection={toggleSection}
              handleLessonSelect={handleLessonSelect}
              userRole={user?.role}
              isEnrolled={course.isEnrolled}
              onLessonComplete={handleLessonComplete}
              progress={course.progress}
              isLessonCompleted={isLessonCompleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
