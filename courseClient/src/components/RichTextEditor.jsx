import React from 'react';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, glassMode = false }) => {
  return (
    <div
      className={`text-white border rounded-xl overflow-hidden relative ${
        glassMode ? "border-white/40" : "border-gray-200/40"
      }`}
      style={{
        minHeight: "140px",
        height: "auto",
        position: "relative",
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{
          position: "relative",
          minHeight: "140px",
        }}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        }}
      />
      <style>{`
        /* Responsive container */
        .ql-container {
          position: relative !important;
          min-height: 90px !important;
          height: auto !important;
          overflow: visible !important;
        }
        
        .ql-editor {
          position: relative !important;
          min-height: 90px !important;
          max-height: 200px !important;
          height: auto !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          padding: 10px 12px !important;
          color: white !important;
          line-height: 1.5 !important;
          box-sizing: border-box !important;
        }

        /* Responsive toolbar */
        .ql-toolbar {
          position: relative !important;
          min-height: 42px !important;
          height: auto !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          box-sizing: border-box !important;
          padding: 8px 6px !important;
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 4px !important;
        }

        .ql-toolbar .ql-stroke {
          stroke: rgba(255, 255, 255, 0.8) !important;
        }

        .ql-toolbar .ql-fill {
          fill: rgba(255, 255, 255, 0.8) !important;
        }

        .ql-container.ql-snow {
          border: none !important;
          background: transparent !important;
          font-family: inherit !important;
        }

        .ql-toolbar.ql-snow {
          border: none !important;
        }

        /* Better paragraph spacing */
        .ql-editor p, .ql-editor div {
          margin: 0 0 4px 0 !important;
          word-wrap: break-word !important;
          word-break: break-word !important;
          line-height: 1.5 !important;
        }

        .ql-editor ul, .ql-editor ol {
          margin: 0 0 4px 0 !important;
          padding-left: 20px !important;
        }

        .ql-editor li {
          margin: 2px 0 !important;
          padding: 0 !important;
          line-height: 1.5 !important;
        }

        /* Ensure no elements can break the container */
        .ql-editor * {
          max-width: 100% !important;
          word-wrap: break-word !important;
        }

        /* Custom scrollbar */
        .ql-editor::-webkit-scrollbar {
          width: 6px;
        }

        .ql-editor::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .ql-editor::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .ql-editor::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Responsive toolbar formats */
        .ql-toolbar .ql-formats {
          margin-right: 6px !important;
          display: flex !important;
          align-items: center !important;
          gap: 2px !important;
        }

        /* Toolbar button styling - responsive */
        .ql-toolbar button {
          width: 32px !important;
          height: 28px !important;
          padding: 4px !important;
          margin: 0 !important;
          border: none !important;
          border-radius: 4px !important;
          background: transparent !important;
          color: rgba(255, 255, 255, 0.7) !important;
          transition: all 0.2s ease !important;
          flex-shrink: 0 !important;
        }

        /* Smaller buttons on mobile */
        @media (max-width: 640px) {
          .ql-toolbar button {
            width: 28px !important;
            height: 26px !important;
            padding: 3px !important;
          }
          
          .ql-toolbar {
            padding: 6px 4px !important;
            gap: 2px !important;
          }
          
          .ql-toolbar .ql-formats {
            margin-right: 4px !important;
          }
        }

        /* Toolbar button hover state */
        .ql-toolbar button:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.9) !important;
        }

        /* Toolbar button active state */
        .ql-toolbar button.ql-active {
          background: rgba(6, 182, 212, 0.3) !important;
          color: rgb(6, 182, 212) !important;
          box-shadow: 0 0 0 1px rgba(6, 182, 212, 0.4) !important;
        }

        /* Toolbar button active hover state */
        .ql-toolbar button.ql-active:hover {
          background: rgba(6, 182, 212, 0.4) !important;
          color: rgb(8, 202, 242) !important;
        }

        /* Dropdown button styling */
        .ql-toolbar .ql-picker {
          color: rgba(255, 255, 255, 0.7) !important;
          flex-shrink: 0 !important;
        }

        .ql-toolbar .ql-picker:hover {
          color: rgba(255, 255, 255, 0.9) !important;
        }

        .ql-toolbar .ql-picker.ql-expanded {
          color: rgb(6, 182, 212) !important;
        }

        /* Picker label styling */
        .ql-toolbar .ql-picker-label {
          border: none !important;
          padding: 4px 6px !important;
          border-radius: 4px !important;
          transition: all 0.2s ease !important;
        }

        @media (max-width: 640px) {
          .ql-toolbar .ql-picker-label {
            padding: 3px 4px !important;
          }
        }

        .ql-toolbar .ql-picker-label:hover {
          background: rgba(255, 255, 255, 0.1) !important;
        }

        .ql-toolbar .ql-picker.ql-expanded .ql-picker-label {
          background: rgba(6, 182, 212, 0.3) !important;
          color: rgb(6, 182, 212) !important;
        }

        /* Dropdown options styling */
        .ql-toolbar .ql-picker-options {
          background: rgba(30, 41, 59, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 6px !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4) !important;
          margin-top: 2px !important;
          z-index: 100 !important;
        }

        .ql-toolbar .ql-picker-item {
          color: rgba(255, 255, 255, 0.8) !important;
          padding: 6px 12px !important;
          transition: all 0.2s ease !important;
        }

        .ql-toolbar .ql-picker-item:hover {
          background: rgba(6, 182, 212, 0.2) !important;
          color: rgb(6, 182, 212) !important;
        }

        .ql-toolbar .ql-picker-item.ql-selected {
          background: rgba(6, 182, 212, 0.3) !important;
          color: rgb(6, 182, 212) !important;
        }

        /* Focus states for accessibility */
        .ql-toolbar button:focus-visible {
          outline: 2px solid rgb(6, 182, 212) !important;
          outline-offset: 1px !important;
        }

        .ql-toolbar .ql-picker-label:focus-visible {
          outline: 2px solid rgb(6, 182, 212) !important;
          outline-offset: 1px !important;
        }

        /* Placeholder styling */
        .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4) !important;
          font-style: italic !important;
          left: 12px !important;
          right: 12px !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;