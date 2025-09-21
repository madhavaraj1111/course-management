import React from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  const {
    course,
    loading,
    totalLessons,
    handleBack,
    handleEdit,
    handleDelete,
  } = useCourseDetail(courseId, navigate);

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

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <CourseHeader
        course={course}
        totalLessons={totalLessons}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 lg:order-2">
            <QuickNavigation
              course={course}
              isMobile={isMobile}
              selectedSection={selectedSection}
              selectedLesson={selectedLesson}
              handleQuickSectionNav={handleQuickSectionNav}
              handleQuickLessonNav={handleQuickLessonNav}
              totalLessons={totalLessons}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 w-full max-w-4xl lg:order-1">
            <CourseMeta course={course} totalLessons={totalLessons} />
            <CourseDescription course={course} />
            <CourseStructure
              course={course}
              selectedSection={selectedSection}
              selectedLesson={selectedLesson}
              expandedSections={expandedSections}
              sectionRefs={sectionRefs}
              lessonRefs={lessonRefs}
              toggleSection={toggleSection}
              handleLessonSelect={handleLessonSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
