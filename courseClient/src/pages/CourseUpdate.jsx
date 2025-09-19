import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCourse } from "../store/slices/coursesSlice";
import CourseForm from "../components/course-form/CourseForm";

const CourseUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { courses, selectedCourse } = useSelector((state) => state.courses);

  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let currentCourse = null;
    let courseIndex = null;

    if (selectedCourse?.course) {
      currentCourse = selectedCourse.course;
      courseIndex = selectedCourse.index;
    } else if (courseId && courses && courses.length > 0) {
      courseIndex = courses.findIndex(
        (course) =>
          course.id === courseId ||
          course._id === courseId ||
          courses.indexOf(course).toString() === courseId
      );

      if (courseIndex !== -1) {
        currentCourse = courses[courseIndex];
      }
    } else {
      const savedCourse = localStorage.getItem("editingCourse");
      if (savedCourse) {
        try {
          const parsed = JSON.parse(savedCourse);
          currentCourse = parsed.course;
          courseIndex = parsed.index;
        } catch (e) {
          console.error("Error parsing saved course data:", e);
        }
      }
    }

    if (currentCourse) {
      setCourseData(currentCourse);
      setError(null);
      localStorage.setItem(
        "editingCourse",
        JSON.stringify({
          course: currentCourse,
          index: courseIndex,
        })
      );
    } else {
      setError("Course not found. Please select a course to edit.");
    }

    setLoading(false);
  }, [selectedCourse, courseId, courses]);

  const handleSubmit = (data) => {
    const savedData = localStorage.getItem("editingCourse");
    let courseIndex = null;

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        courseIndex = parsed.index;
      } catch (e) {
        console.error("Error parsing saved course data:", e);
      }
    }

    if (courseIndex !== null) {
      dispatch(
        updateCourse({
          index: courseIndex,
          updatedCourse: data,
        })
      );
      localStorage.removeItem("editingCourse");
      navigate("/courses");
    } else {
      setError("Unable to save course. Course index not found.");
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("editingCourse");
    navigate("/courses");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading course data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error}</div>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
          >
            Go Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <CourseForm
      mode="update"
      initialData={courseData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CourseUpdate;
