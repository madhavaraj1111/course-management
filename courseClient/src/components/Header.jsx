import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleAddCourse = () => navigate("/courses/create");

  return (
    <header className=" pt-2 px-10 bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center  py-4">
          {/* Left Section - Logo & Brand */}
          <div className="">
            <img
              src="../src/assets/PerfectStudy.png"
              alt="Perfect Study"
              className="w-12 h-12 rounded-full shadow-lg bg-white"
            />
          </div>

          {/* Right Section - Navigation */}
          <nav className="flex items-center space-x-6">
            <Button onClick={handleAddCourse}>Add Courses</Button>

            <Button variant="none">Login</Button>
            <Button variant="primary" className="rounded-full">
              Create Account
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
