import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../contexts/AuthContext";
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
            <button
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Continue Learning
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </button>
          );
        }
        break;

      case "enrolled":
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Continue
            </button>
            {course.progress !== undefined && (
              <span className="text-xs text-gray-600">
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
              <button
                onClick={handleEdit}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/courses/${course._id}`)}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
              >
                View
              </button>
            </div>
          );
        } else {
          return (
            <button
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            >
              View Details
            </button>
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

      {/* Status Badges */}
      <div className="absolute top-2 right-2 z-20">
        {viewMode === "browse" && course.isEnrolled && (
          <div className="bg-green-500 text-white px-2 py-1 rounded text-xs mb-1">
            Enrolled
          </div>
        )}
        {viewMode === "enrolled" && course.progress !== undefined && (
          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
            {course.progress}%
          </div>
        )}
        {viewMode === "manage" && userRole === "admin" && (
          <div className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
            {getEnrollmentCount()}
          </div>
        )}
        {course.instructor?._id === instructorId && (
          <div className="bg-emerald-700 text-white px-2 py-1 rounded text-xs">
            Your creation
          </div>
        )}
      </div>

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
          onEdit={userRole === "admin" ? handleEdit : null}
          onDelete={userRole === "admin" ? handleDelete : null}
          preview={preview}
          instructorId={instructorId}
          actionButtons={getActionButtons()}
          viewMode={viewMode}
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
