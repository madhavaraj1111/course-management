import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div className="text-white border border-gray-200/40 rounded-xl overflow-auto">
      <ReactQuill theme="snow" value={value} onChange={onChange}/>
    </div>
  );
};

export default RichTextEditor;