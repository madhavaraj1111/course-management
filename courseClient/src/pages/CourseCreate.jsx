import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../store/slices/coursesSlice";
import CourseForm from "../components/CourseForm";

const CourseCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    dispatch(addCourse(data));
    navigate("/courses");
  };

  const handleCancel = () => {
    navigate("/courses");
  };

  return (
    <CourseForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CourseCreate;