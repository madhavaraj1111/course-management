import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCourse } from "../store/slices/coursesSlice";
import CourseForm from "../components/course-form/CourseForm";

const CourseCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");

    const result = await dispatch(createCourse(data));

    if (createCourse.fulfilled.match(result)) {
      navigate("/courses");
    } else {
      setError(result.payload || "Error creating course");
    }

    setLoading(false);
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
        onCancel={() => navigate("/courses")}
        loading={loading}
      />
    </div>
  );
};

export default CourseCreate;