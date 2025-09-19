import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  selectCourse,
} from "../../../store/slices/coursesSlice.js";

export const useCourseDetail = (courseId, navigate) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list) || [];
  const [course, setCourse] = useState(null);
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
    dispatch(selectCourse({ course, index: courseIndex }));
    navigate("/courses/update");
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${course.title}"?`)) {
      const courseIndex = parseInt(courseId, 10);
      dispatch(deleteCourse(courseIndex));
      navigate("/courses");
    }
  };

  const handleBack = () => navigate("/courses");

  const totalLessons =
    course?.sections?.reduce(
      (total, section) => total + (section.lessons?.length || 0),
      0
    ) || 0;

  return {
    course,
    loading,
    totalLessons,
    handleBack,
    handleEdit,
    handleDelete,
  };
};
