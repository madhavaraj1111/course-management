import { memo } from "react";
import Button from "../../../components/common/Button";

const AdminCourseItem = memo(({ course, navigate, handleDelete }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 className="font-medium text-white">{course.title}</h3>
        <p className="text-sm text-white/60">
          {course.category} • {course.difficulty}
        </p>
        <p className="text-sm text-blue-400">
          {course.enrolledStudents?.length || 0} students enrolled
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => navigate(`admin/courses/${course._id}/edit`)}
          variant="success"
          size="sm"
        >
          Edit
        </Button>
        <Button
          onClick={() => navigate(`/courses/${course._id}`)}
          variant="glass"
          size="sm"
        >
          View
        </Button>
        <Button
          onClick={() => handleDelete(course._id)}
          variant="danger"
          size="sm"
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
));

export default AdminCourseItem;