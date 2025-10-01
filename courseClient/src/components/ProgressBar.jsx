const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Progress Bar Background */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
        {/* Progress Fill */}
        <div
          className="h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full relative overflow-hidden transition-all duration-500 ease-out"
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
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 border-2 border-white rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-lg transition-all duration-500 ease-out"
        style={{
          left: `calc(${Math.max(5, Math.min(95, percentage))}% - 1rem)`,
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
