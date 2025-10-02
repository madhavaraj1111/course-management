const Checkbox = ({ checked, onChange, label = null }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none text-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />

      {/* Custom box */}
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-md border transition-all shadow-sm
          ${
            checked
              ? "bg-cyan-500/20 border-cyan-500"
              : "bg-gray-600/40 border-gray-500/60"
          }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </span>

      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
