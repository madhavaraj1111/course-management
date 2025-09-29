import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../contexts/AuthContext";
import CourseForm from "../components/course-form/CourseForm";

const CourseCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    console.log(data);

    setLoading(true);
    setError("");

    try {
      await apiRequest("/admin/courses", {
        method: "POST",
        body: data, // Remove JSON.stringify - apiRequest handles this
      });

      navigate("/courses");
    } catch (error) {
      setError(error.message || "Error creating course");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/courses");
  };

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
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};

export default CourseCreate;
