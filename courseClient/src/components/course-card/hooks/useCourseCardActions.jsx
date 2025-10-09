import { useCallback } from "react";
import { apiRequest } from "../../../utils/api";
import Button from "../../common/Button";

export const useCourseCardActions = ({
  course,
  viewMode,
  userRole,
  loading,
  navigate,
  onEnroll,
}) => {
  const handleDelete = useCallback(
    async (e) => {
      e.stopPropagation();

      const confirmed = window.confirm(
        `Are you sure you want to delete "${course.title}"?`
      );

      if (!confirmed) return;

      try {
        await apiRequest(`/admin/courses/${course._id}`, { method: "DELETE" });

        // Trigger parent refresh if on courses page
        if (window.location.pathname.includes("/courses")) {
          window.location.reload();
        }
      } catch (error) {
        alert("Error deleting course: " + error.message);
      }
    },
    [course._id, course.title]
  );

  const handleEdit = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`/admin/courses/${course._id}/edit`);
    },
    [navigate, course._id]
  );

  const handleEnroll = useCallback(
    async (e) => {
      e.stopPropagation();
      if (onEnroll && !loading) {
        await onEnroll(course._id);
      }
    },
    [onEnroll, loading, course._id]
  );

  const handleContinue = useCallback(
    (e) => {
      e?.stopPropagation();
      navigate(`/courses/${course._id}`);
    },
    [navigate, course._id]
  );

  // Get action buttons based on view mode and user role
  const getActionButtons = useCallback(() => {
    switch (viewMode) {
      case "browse":
        if (userRole === "student") {
          return course.isEnrolled ? (
            <Button
              onClick={handleContinue}
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
              className="text-blue-600 hover:text-blue-400"
              size="sm"
            >
              {loading ? "Enrolling..." : "Enroll Now"}
            </Button>
          );
        }
        return null;

      case "enrolled":
        return (
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleContinue}
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
              <Button onClick={handleContinue} variant="glass" size="sm">
                View
              </Button>
            </div>
          );
        } else {
          return (
            <Button onClick={handleContinue} variant="glass" size="sm">
              View Details
            </Button>
          );
        }
    }
  }, [
    viewMode,
    userRole,
    course.isEnrolled,
    course.progress,
    loading,
    handleEnroll,
    handleEdit,
    handleDelete,
    handleContinue,
  ]);

  return {
    handleDelete,
    handleEdit,
    handleEnroll,
    handleContinue,
    getActionButtons,
  };
};
