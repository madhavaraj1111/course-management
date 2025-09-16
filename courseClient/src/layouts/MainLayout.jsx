import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center text-white 
      bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(to_right,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_21px,transparent_21px,transparent_40px),repeating-linear-gradient(to_bottom,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(to_bottom,rgba(255,255,255,0.05)_20px,rgba(255,255,255,0.05)_21px,transparent_21px,transparent_40px)] 
      bg-primary"
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
