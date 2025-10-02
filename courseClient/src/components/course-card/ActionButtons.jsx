import React from "react";
import Button from "../common/Button"; // Adjust the import path as needed

const ActionButtons = ({ onEdit, onDelete, preview }) => {
  return (
    <div className="border-t border-gray-300 pt-4 flex justify-end relative z-10">
      <div className="flex gap-5">
        {/* Edit Button */}
        <Button
          onClick={onEdit}
          disabled={preview}
          variant="purple"
          size="xs"
          className="text-purple-600 hover:text-purple-400"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
              />
            </svg>
          }
          iconPosition="left"
          aria-label="Edit"
        />

        {/* Delete Button */}
        <Button
          onClick={onDelete}
          disabled={preview}
          variant="danger"
          size="xs"
          className="text-red-600 hover:text-red-400"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
              />
            </svg>
          }
          iconPosition="left"
          aria-label="Delete"
        />
      </div>
    </div>
  );
};

export default ActionButtons;
