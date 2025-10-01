import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../contexts/AuthContext";
import Checkbox from "../CheckBox";
import BookCover from "./BookCover";
import BookPages from "./BookPages";
import Button from "../Button"; // Import your Button component
import { cardColors } from "./constants";

const CourseCard = ({
  course,
  index,
  preview = false,
  selected,
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

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      try {
        await apiRequest(`/admin/courses/${course._id}`, { method: "DELETE" });
        // Instead of reload, trigger parent refresh
        if (window.location.pathname.includes("/courses")) {
          window.location.reload();
        }
      } catch (error) {
        alert("Error deleting course: " + error.message);
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/admin/courses/${course._id}/edit`);
  };

  const handleEnroll = async (e) => {
    e.stopPropagation();
    if (onEnroll && !loading) {
      setLoading(true);
      await onEnroll(course._id);
      setLoading(false);
    }
  };

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

  // Get action buttons based on view mode and user role
  const getActionButtons = () => {
    if (preview) return null;

    switch (viewMode) {
      case "browse":
        if (userRole === "student") {
          return course.isEnrolled ? (
            <Button
              onClick={() => navigate(`/courses/${course._id}`)}
              variant="success"
              size="sm"
              className="text-green-600 hover:text-green-400"
            >
              Continue Learning
            </Button>
          ) : (
            <Button
              onClick={handleEnroll}
              disabled={loading}
              variant="info"
              size="sm"
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </Button>
          );
        }
        break;

      case "enrolled":
        return (
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => navigate(`/courses/${course._id}`)}
              variant="info"
              size="sm"
              className="text-blue-600 hover:text-blue-400"
            >
              Continue
            </Button>
            {course.progress !== undefined && (
              <span className="text-xs text-gray-800">
                {course.progress}% complete
              </span>
            )}
          </div>
        );

      case "manage":
      default:
        if (userRole === "admin") {
          return (
            <div className="flex space-x-2">
              <Button onClick={handleEdit} variant="success" size="sm">
                Edit
              </Button>
              <Button onClick={handleDelete} variant="danger" size="sm">
                Delete
              </Button>
              <Button
                onClick={() => navigate(`/courses/${course._id}`)}
                variant="glass"
                size="sm"
              >
                View
              </Button>
            </div>
          );
        } else {
          return (
            <Button
              onClick={() => navigate(`/courses/${course._id}`)}
              variant="glass"
              size="sm"
            >
              View Details
            </Button>
          );
        }
    }
    return null;
  };

  // Get enrollment count for admin view
  const getEnrollmentCount = () => {
    if (userRole === "admin" && course.enrolledStudents) {
      return `${course.enrolledStudents.length} enrolled`;
    }
    return null;
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
