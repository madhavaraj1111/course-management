import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../contexts/AuthContext";
import CourseForm from "../components/course-form/CourseForm";

const CourseUpdate = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const [courseData, setCourseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    } else {
      setError("No course ID provided");
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const data = await apiRequest(`/courses/${courseId}`);
      setCourseData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching course:', error);
      setError("Course not found or you don't have permission to edit it.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError(null);
    
    try {
      await apiRequest(`/admin/courses/${courseId}`, {
        method: 'PUT',
        body: data
      });
      
      navigate("/courses");
    } catch (error) {
      console.error('Error updating course:', error);
      setError(error.message || 'Error updating course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/courses");
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
        initialData={courseData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={submitting}
      />
    </div>
  );
};

export default CourseUpdate;