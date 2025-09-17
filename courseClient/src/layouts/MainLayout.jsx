import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center 
      from-cyan-950 to-primary bg-gradient-to-br "
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
