import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default RichTextEditor;
