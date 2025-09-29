import SectionsList from "./SectionsList";
import ActionButtons from "./ActionButtons";

const BookPages = ({ 
  course, 
  isHovered, 
  onEdit, 
  onDelete, 
  preview, 
  actionButtons, 
  viewMode 
}) => {
  return (
    <div
      className={`absolute inset-0 bg-white rounded-r-lg shadow-lg transform transition-all duration-700 ${
        isHovered ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="h-full p-6 flex flex-col relative">
        {/* Page flutter layers */}
        <div>
          <div className="absolute inset-0 bg-white/20 rounded-r-lg transform translate-x-1 translate-y-1 rotate-1 pointer-events-none"></div>
          <div className="absolute inset-0 bg-white/10 rounded-r-lg transform translate-x-2 translate-y-2 rotate-2 pointer-events-none"></div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-300 pb-4 mb-6 relative z-10">
          <h4 className="text-lg font-bold text-gray-800 text-center">
            {viewMode === 'browse' ? 'Course Overview' : 'Course Index'}
          </h4>
        </div>

        {/* Course Info for browse mode */}
        {viewMode === 'browse' && (
          <div className="mb-4 relative z-10">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-medium">{course.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-medium">{course.difficulty}</span>
              </div>
              {course.enrolledStudents && (
                <div className="flex justify-between">
                  <span>Students:</span>
                  <span className="font-medium">{course.enrolledStudents.length || 0}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sections */}
        <SectionsList sections={course.sections} viewMode={viewMode} />

        {/* Dynamic Action Buttons */}
        {actionButtons ? (
          <div className="mt-auto pt-4 border-t border-gray-200 relative z-10">
            <div className="flex justify-center">
              {actionButtons}
            </div>
          </div>
        ) : (
          // Fallback to old ActionButtons component
          <ActionButtons 
            onEdit={onEdit}
            onDelete={onDelete}
            preview={preview}
          />
        )}

        {/* Page lines */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-red-200"></div>
        <div className="absolute left-14 top-0 bottom-0 w-px bg-blue-100"></div>
      </div>
    </div>
  );
};

export default BookPages;