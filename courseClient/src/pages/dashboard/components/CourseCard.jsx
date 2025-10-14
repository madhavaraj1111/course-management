import { memo } from "react";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/ProgressBar";

const CourseCard = memo(({ course, navigate }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all">
    <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-white">
      {course.title}
    </h3>
    <p className="text-sm text-white/60 mb-4">by {course.instructorName}</p>
    <div className="mb-4 pr-3">
      <ProgressBar percentage={course.progress} />
    </div>
    <div className="flex items-center justify-between">
      <p className="text-sm text-white/70">{course.progress}% complete</p>
      <Button
        onClick={() => navigate(`/courses/${course._id}`)}
        variant="success"
        size="sm"
      >
        Continue
      </Button>
    </div>
  </div>
));

export default CourseCard;