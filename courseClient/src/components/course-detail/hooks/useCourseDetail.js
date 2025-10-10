import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchCourseById, 
  deleteCourses, 
  enrollCourse 
} from "../../../store/slices/coursesSlice";
import { markLessonComplete } from "../../../store/slices/progressSlice";
import { setProgress } from "../../../store/slices/progressSlice";
import { 
  selectSelectedCourse, 
  selectCoursesLoading, 
  selectCoursesError,
  selectCourseProgress,
  selectCourseStats
} from "../../../store/selectors";

export const useCourseDetail = (courseId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const course = useSelector(selectSelectedCourse);
  const loading = useSelector(selectCoursesLoading);
  const error = useSelector(selectCoursesError);
  const progress = useSelector((state) => selectCourseProgress(state, courseId));
  const { totalLessons, completedLessons, progressPercent } = useSelector((state) => 
    selectCourseStats(state, courseId)
  );

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId]);

  // Sync course progress to Redux progress state
  useEffect(() => {
    if (course?.progress) {
      dispatch(setProgress({ courseId, progress: course.progress }));
    }
  }, [course?.progress, courseId, dispatch]);

  const isLessonCompleted = useCallback(
    (sectionId, lessonId) => {
      return progress.some(
        (p) =>
          p.sectionId.toString() === sectionId.toString() &&
          p.lessonId.toString() === lessonId.toString()
      );
    },
    [progress]
  );

  const handleBack = useCallback(() => {
    navigate("/courses");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    navigate(`/admin/courses/${courseId}/edit`);
  }, [navigate, courseId]);

  const handleDelete = useCallback(async () => {
    if (!course) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.title}"?`
    );
    if (!confirmed) return;

    try {
      await dispatch(deleteCourses([courseId])).unwrap();
      navigate("/courses");
    } catch (err) {
      alert("Error deleting course: " + err);
    }
  }, [course, courseId, dispatch, navigate]);

  const handleEnroll = useCallback(async () => {
    try {
      await dispatch(enrollCourse(courseId)).unwrap();
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Error enrolling: " + err);
    }
  }, [dispatch, courseId]);

  const handleLessonComplete = useCallback(
  async (sectionId, lessonId) => {
    try {
      await dispatch(markLessonComplete({ courseId, sectionId, lessonId })).unwrap();
      // Don't refetch - state should update automatically via markLessonComplete
    } catch (err) {
      console.error("Error marking lesson complete:", err);
    }
  },
  [dispatch, courseId]
);

  return {
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
  };
};