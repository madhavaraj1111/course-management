const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative w-full">
      {/* Progress Bar Background */}
      <div className="w-full h-1.5 sm:h-2 bg-gray-200/20 rounded-full overflow-hidden relative">
        {/* Progress Fill */}
        <div
          className="h-full bg-gradient-to-r from-green-700 to-green-700 rounded-full relative overflow-hidden transition-all duration-500 ease-out"
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
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 text-[10px] bg-green-700 border-[3px] border-white rounded-full flex items-center justify-center font-bold text-white shadow-lg transition-all duration-500 ease-out"
        style={{
          left: `calc(${percentage}% - 1.25rem)`,
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
