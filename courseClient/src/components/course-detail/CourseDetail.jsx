// CourseDetail.jsx - Main component (simplified)
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCourseDetail } from "./hooks/useCourseDetail";
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
  const { user } = useSelector((state) => state.auth);

  // Fetch course data and handle actions
  const {
    course,
    loading,
    error,
    totalLessons,
    completedLessons,
    progressPercent,
    isLessonCompleted,
    handleBack,
    handleEdit,
    handleDelete,
    handleEnroll,
    handleLessonComplete,
  } = useCourseDetail(courseId);

  // Navigation state management
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Error state
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

  // No course found
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
          {/* Desktop Sidebar Navigation */}
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

            {/* Mobile Navigation */}
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
