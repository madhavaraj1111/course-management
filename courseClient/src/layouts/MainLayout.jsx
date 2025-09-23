import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen w-screen  items-center justify-center 
        bg-gradient-to-br from-black via-neutral-900 to-black relative overflow-hidden"
    >
      {/* Gold accents (soft glow shapes) */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute top-40 right-20 w-72 h-24 bg-yellow-400/20 rotate-12 rounded-lg blur-2xl pointer-events-none"/>
      <div className="absolute bottom-24 left-32 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"/>
      <div className="absolute bottom-10 right-32 w-80 h-28 bg-yellow-600/10 -rotate-6 rounded-lg blur-3xl pointer-events-none"/>

      <Outlet />
    </div>
  );
};

export default MainLayout;
