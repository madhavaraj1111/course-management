
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../contexts/AuthContext";

export const useCourseDetail = (courseId) => {
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate course statistics
  const totalLessons = course?.sections?.reduce(
    (acc, section) => acc + (section.lessons?.length || 0),
    0
  ) || 0;

  const completedLessons = course?.progress?.length || 0;
  
  const progressPercent = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;

  // Fetch course data
  const fetchCourse = useCallback(async () => {
    if (!courseId) {
      setError("Invalid course ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await apiRequest(`/courses/${courseId}`);
      setCourse(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching course:", err);
      setError(err.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  // Check if a lesson is completed
  const isLessonCompleted = useCallback((sectionId, lessonId) => {
    if (!course?.progress || !Array.isArray(course.progress)) return false;
    
    return course.progress.some(
      (p) =>
        p.sectionId.toString() === sectionId.toString() &&
        p.lessonId.toString() === lessonId.toString()
    );
  }, [course?.progress]);

  // Navigation handlers
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
      await apiRequest(`/admin/courses/${courseId}`, { method: "DELETE" });
      navigate("/courses");
    } catch (err) {
      alert("Error deleting course: " + err.message);
    }
  }, [course, courseId, navigate]);

  const handleEnroll = useCallback(async () => {
    try {
      await apiRequest(`/courses/${courseId}/enroll`, { method: "POST" });
      
      // Update enrollment status locally without full refresh
      setCourse(prevCourse => {
        if (!prevCourse) return prevCourse;
        return { ...prevCourse, isEnrolled: true };
      });
      
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Error enrolling: " + err.message);
    }
  }, [courseId]);

  const handleLessonComplete = useCallback(async (sectionId, lessonId) => {
    try {
      await apiRequest(
        `/courses/${courseId}/lessons/${sectionId}/${lessonId}/complete`,
        { method: "POST" }
      );
      
      // Update progress locally without full refresh
      setCourse(prevCourse => {
        if (!prevCourse) return prevCourse;
        
        const updatedProgress = [...(prevCourse.progress || [])];
        const exists = updatedProgress.some(
          p => p.sectionId.toString() === sectionId.toString() 
            && p.lessonId.toString() === lessonId.toString()
        );
        
        if (!exists) {
          updatedProgress.push({ sectionId, lessonId });
        }
        
        return { ...prevCourse, progress: updatedProgress };
      });
    } catch (err) {
      console.error("Error marking lesson complete:", err);
    }
  }, [courseId]);

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
    refetch: fetchCourse, // Expose refetch for manual updates
  };
};