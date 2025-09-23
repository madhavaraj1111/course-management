import React from "react";

const CourseThumbnail = ({ thumbnail, title }) => {
  return (
    <div className="relative z-10 flex-1 flex items-center justify-center">
      <div className="w-48 h-36 rounded-xl overflow-hidden shadow-md border border-white/20 backdrop-blur-sm relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* faded corners / vignette overlay */}
        <div
          className="absolute inset-0 rounded-xl 
          bg-gradient-to-tr from-black/40 via-transparent to-black/40 
          pointer-events-none"
        ></div>
        <div
          className="absolute inset-0 rounded-xl 
          bg-gradient-to-bl from-black/30 via-transparent to-black/30 
          pointer-events-none"
        ></div>
      </div>
    </div>
  );
};

export default CourseThumbnail;