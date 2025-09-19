import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, glassMode = false }) => {
  return (
    <div
      className={`text-white border rounded-xl overflow-hidden relative ${
        glassMode ? "border-white/40" : "border-gray-200/40"
      }`}
      style={{
        height: "100px", // Fixed container height
        position: "relative",
      }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "100px",
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
        /* Force absolute positioning and fixed heights */
        .ql-container {
          position: absolute !important;
          top: 41px !important; /* Account for toolbar height */
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          height: 59px !important; /* 100px - 41px toolbar */
          max-height: 59px !important;
          overflow: hidden !important;
        }
        
        .ql-editor {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          height: 59px !important;
          max-height: 59px !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          padding: 8px 12px !important;
          color: white !important;
          line-height: 1.4 !important;
          box-sizing: border-box !important;
        }

        .ql-toolbar {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 41px !important;
          max-height: 41px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          box-sizing: border-box !important;
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

        /* Prevent any expansion or layout shifts */
        .ql-editor p, .ql-editor div {
          margin: 0 0 2px 0 !important;
          word-wrap: break-word !important;
          word-break: break-word !important;
          line-height: 1.4 !important;
        }

        .ql-editor ul, .ql-editor ol {
          margin: 0 0 2px 0 !important;
          padding-left: 16px !important;
        }

        .ql-editor li {
          margin: 0 !important;
          padding: 0 !important;
          line-height: 1.4 !important;
        }

        /* Ensure no elements can break the container */
        .ql-editor * {
          max-width: 100% !important;
          word-wrap: break-word !important;
        }

        /* Custom scrollbar */
        .ql-editor::-webkit-scrollbar {
          width: 4px;
        }

        .ql-editor::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .ql-editor::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .ql-editor::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Prevent toolbar buttons from wrapping */
        .ql-toolbar .ql-formats {
          margin-right: 8px !important;
        }

        /* Toolbar button styling */
        .ql-toolbar button {
          width: 28px !important;
          height: 24px !important;
          padding: 2px !important;
          margin: 2px 1px !important;
          border: none !important;
          border-radius: 3px !important;
          background: transparent !important;
          color: rgba(255, 255, 255, 0.7) !important;
          transition: all 0.2s ease !important;
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
          padding: 2px 4px !important;
          border-radius: 3px !important;
          transition: all 0.2s ease !important;
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
      `}</style>
    </div>
  );
};

export default RichTextEditor;
