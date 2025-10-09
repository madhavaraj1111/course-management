import { createSelector } from "@reduxjs/toolkit";

// Auth selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectDashboardData = (state) => state.auth.dashboardData;
export const selectAdminCourses = (state) => state.auth.adminCourses;

// Course selectors
export const selectCourses = (state) => state.courses.list;
export const selectSelectedCourse = (state) => state.courses.selectedCourse;
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;

export const selectCourseById = createSelector(
  [selectCourses, (_, courseId) => courseId],
  (courses, courseId) => courses.find((c) => c._id === courseId)
);

// Progress selectors
export const selectCourseProgress = createSelector(
  [(state) => state.progress.completed, (_, courseId) => courseId],
  (completed, courseId) => completed[courseId] || []
);

export const selectIsLessonCompleted = createSelector(
  [selectCourseProgress, (_, __, sectionId, lessonId) => ({ sectionId, lessonId })],
  (progress, { sectionId, lessonId }) =>
    progress.some((p) => p.sectionId === sectionId && p.lessonId === lessonId)
);

export const selectCourseStats = createSelector(
  [selectSelectedCourse, selectCourseProgress],
  (course, progress) => {
    if (!course) return { totalLessons: 0, completedLessons: 0, progressPercent: 0 };

    const totalLessons = course.sections?.reduce(
      (acc, section) => acc + (section.lessons?.length || 0),
      0
    ) || 0;

    const completedLessons = progress.length;
    const progressPercent = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100) 
      : 0;

    return { totalLessons, completedLessons, progressPercent };
  }
);

// UI selectors
export const selectDashboardView = (state) => state.ui.dashboardView;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectNotifications = (state) => state.ui.notifications;