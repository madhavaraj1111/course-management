const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative w-full lg:w-72 max-w-lg mx-auto">
      {/* Progress Bar Background */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
        {/* Progress Fill */}
        <div
          className="h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full relative overflow-hidden transition-all duration-500 ease-out "
          style={{ width: `${percentage}%` }}
        >
          {/* Diagonal Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 8px,
                rgba(255, 255, 255, 0.3) 8px,
                rgba(255, 255, 255, 0.3) 16px
              )`,
            }}
          />
        </div>
      </div>

      {/* Percentage Circle */}
      <div
        className="absolute top-0 w-9 h-9 -mt-4 bg-green-500 border-4 border-white rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-lg transition-all duration-500 ease-out "
        style={{
          left: `calc(${percentage}% - 1.5rem)`,
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
