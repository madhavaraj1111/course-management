import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCourse = () => navigate("/courses/create");

  return (
    <header className="px-4 sm:px-6 lg:px-10 bg-white/5 backdrop-blur-md transition-all border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 ">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="../src/assets/PerfectStudy.png"
            alt="Perfect Study"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg bg-white"
          />
          <span className="text-white font-semibold text-lg sm:text-xl">
            Perfect Study
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            onClick={handleAddCourse}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Add Courses
          </a>
          <a className="text-white hover:text-gray-300 cursor-pointer">Login</a>
          <Button variant="primary" className="rounded-full">
            Create Account
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden text-right flex flex-col space-y-4 px-4 pb-4 text-white">
          <div className=" flex justify-center gap-10">
            <a onClick={handleAddCourse} className="hover:text-gray-300">
              Add Courses
            </a>
            <a className="hover:text-gray-300" href="">
              Login
            </a>
          </div>

          <Button variant="primary" className="rounded-full w-full">
            Create Account
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
