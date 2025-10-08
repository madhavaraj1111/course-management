import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById, updateCourse } from "../store/slices/coursesSlice";
import CourseForm from "../components/course-form/CourseForm";

const CourseUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const { selectedCourse, loading } = useSelector((state) => state.courses);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [dispatch, courseId]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError(null);

    const result = await dispatch(updateCourse({ courseId, courseData: data }));

    if (updateCourse.fulfilled.match(result)) {
      navigate("/courses");
    } else {
      setError(result.payload || "Error updating course");
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
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
    <div>
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <CourseForm
        mode="update"
        initialData={selectedCourse || {}}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/courses")}
        loading={submitting}
      />
    </div>
  );
};

export default CourseUpdate;