// CourseCard.jsx - Simplified main component
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourseCardActions } from "./hooks/useCourseCardActions";
import Checkbox from "../common/CheckBox";
import BookCover from "./BookCover";
import BookPages from "./BookPages";
import { cardColors } from "./constants";

const CourseCard = ({
  course,
  preview = false,
  selected = false,
  onToggleSelect,
  viewMode = "manage",
  userRole,
  instructorId,
  onEnroll,
  showSelection = false,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardColorGradient = cardColors[course.category] || cardColors.Default;

  const { handleDelete, handleEdit, getActionButtons } = useCourseCardActions({
    course,
    viewMode,
    userRole,
    loading,
    navigate,
    onEnroll: async (courseId) => {
      setLoading(true);
      await onEnroll(courseId);
      setLoading(false);
    },
  });

  const handleCardClick = (e) => {
    // Don't navigate if clicking on interactive elements
    if (
      e.target.closest(".book-container") ||
      e.target.closest("button") ||
      e.target.closest(".checkbox-container")
    ) {
      return;
    }
    navigate(`/courses/${course._id}`);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect();
    }
  };

  return (
    <div
      className="relative w-80 h-96 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Checkbox - Only show if showSelection is true */}
      {showSelection && (
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
          viewMode={viewMode}
          instructorId={instructorId}
        />

        {/* Inner Pages */}
        <BookPages
          course={course}
          isHovered={isHovered}
          onEdit={userRole === "admin" ? handleEdit : null}
          onDelete={userRole === "admin" ? handleDelete : null}
          preview={preview}
          instructorId={instructorId}
          actionButtons={getActionButtons()}
          viewMode={viewMode}
          userRole={userRole}
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