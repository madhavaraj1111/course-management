import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, selectCourse } from "../../store/slices/coursesSlice";
import Checkbox from "../CheckBox";
import BookCover from "./BookCover";
import BookPages from "./BookPages";
import { cardColors } from "./constants";

const CourseCard = ({
  course,
  index,
  preview = false,
  selected,
  onToggleSelect,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cardColorGradient = cardColors[course.category] || cardColors.Default;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      dispatch(deleteCourse(index));
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(selectCourse({ course, index }));
    navigate("/courses/update");
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or checkbox or the cover of the course
    if (
      e.target.closest("book-container") ||
      e.target.closest("button") ||
      e.target.closest(".checkbox-container")
    ) {
      return;
    }
    navigate(`/courses/${index}`);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onToggleSelect();
  };

  return (
    <div
      className="relative w-80 h-96 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Checkbox */}
      {!preview && (
        <div className="absolute top-2 left-2 z-20 checkbox-container">
          <Checkbox checked={selected} onChange={handleCheckboxChange} />
        </div>
      )}

      {/* Book Container */}
      <div className="relative w-full h-full transform-style-preserve-3d book-container">
        {/* Spine / Back */}
        <div className="absolute inset-0 bg-black/50 rounded-lg shadow-2xl transform rotateY-2 translate-z-[-8px]"></div>

        {/* Cover */}
        <BookCover
          course={course}
          cardColorGradient={cardColorGradient}
          isHovered={isHovered}
        />

        {/* Inner Pages */}
        <BookPages
          course={course}
          isHovered={isHovered}
          onEdit={handleEdit}
          onDelete={handleDelete}
          preview={preview}
        />

        {/* Hover pulse */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isHovered ? "animate-pulse" : ""
          }`}
        ></div>
      </div>

      {/* Custom styles */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotateY-0 { transform: rotateY(0deg); }
        .rotateY-2 { transform: rotateY(2deg); }
        .rotateY-\\[-160deg\\] { transform: rotateY(-160deg); }
        .translate-z-\\[-8px\\] { transform: translateZ(-8px); }
      `}</style>
    </div>
  );
};

export default CourseCard;
