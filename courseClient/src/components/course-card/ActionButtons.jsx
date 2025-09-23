import React from "react";

const ActionButtons = ({ onEdit, onDelete, preview }) => {
  return (
    <div className="border-t border-gray-300 pt-4 flex justify-end relative z-10">
      <div className="flex gap-5">
        {/* Edit Button */}
        <button
          onClick={onEdit}
          disabled={preview}
          className="p-2 transition-all text-gray-500 hover:text-purple-600 hover:bg-purple-200 cursor-pointer bg-gray-300 rounded"
        >
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
        </button>

        {/* Delete Button */}
        <button
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-200 cursor-pointer bg-gray-300 rounded transition-all"
          onClick={onDelete}
          disabled={preview}
        >
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
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
