import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../store/slices/coursesSlice";
import RichTextEditor from "../components/RichTextEditor";

const CourseCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="border p-2 w-full mb-2"
        />
        {/* <div className="mb-2">
          <label>Description</label>
          <RichTextEditor value={description} onChange={setDescription} />
        </div> */}
      </form>
    </div>
  );
};

export default CourseCreate;
