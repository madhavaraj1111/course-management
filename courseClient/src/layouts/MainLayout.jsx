import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center 
      bg-primary"
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
