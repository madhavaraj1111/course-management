import React from "react";
import Button from "../Button";

const CourseHeader = ({ userRole, onBack, onEdit, onDelete }) => {
  return (
    <div className="bg-gradient-to-r from-10% from-primary   to-cyan-950 shadow-sm sticky top-0 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back button */}
          <Button
            onClick={onBack}
            variant="glass"
            className="flex items-center space-x-2 text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline">Back to Courses</span>
            <span className="sm:hidden">Back</span>
          </Button>

          {/* Edit + Delete */}
          {userRole === "admin" && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={onEdit}
                variant="primary"
                className="flex items-center space-x-1 text-sm px-3 py-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Edit</span>
              </Button>

              <Button
                onClick={onDelete}
                variant="danger"
                className="flex items-center space-x-1 text-sm px-3 py-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Delete</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
