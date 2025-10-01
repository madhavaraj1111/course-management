import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import logo from "../assets/PerfectStudy.png";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleAddCourse = () => navigate("/admin/courses/create");
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  // Authenticated Header
  if (isAuthenticated) {
    return (
      <header className="px-4 sm:px-6 lg:px-10 bg-white/5 backdrop-blur-md transition-all border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Perfect Study"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg object-cover bg-white"
            />
            <span className="text-white font-semibold text-lg sm:text-xl">
              Perfect Study
            </span>
          </div>

          {/* Desktop Nav - Role Based */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Courses
            </button>

            {user?.role === "admin" && (
              <button
                onClick={handleAddCourse}
                className="text-white hover:text-gray-300 transition-colors"
              >
                Create Course
              </button>
            )}

            {user?.role === "student" && (
              <button
                onClick={() => navigate("/my-courses")}
                className="text-white hover:text-gray-300 transition-colors"
              >
                My Courses
              </button>
            )}

            <div className="flex items-center space-x-3 text-white text-sm">
              <span className="hidden lg:block">
                {user?.username} ({user?.role})
              </span>
              <Button
                onClick={logout}
                variant="danger"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown - Authenticated */}
        {isOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-sm border-t border-white/10">
            <div className="flex flex-col space-y-4 px-4 py-4 text-white">
              <button
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
                className="text-left hover:text-gray-300 transition-colors"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  navigate("/courses");
                  setIsOpen(false);
                }}
                className="text-left hover:text-gray-300 transition-colors"
              >
                Courses
              </button>

              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    handleAddCourse();
                    setIsOpen(false);
                  }}
                  className="text-left hover:text-gray-300 transition-colors"
                >
                  Create Course
                </button>
              )}

              {user?.role === "student" && (
                <button
                  onClick={() => {
                    navigate("/my-courses");
                    setIsOpen(false);
                  }}
                  className="text-left hover:text-gray-300 transition-colors"
                >
                  My Courses
                </button>
              )}

              <div className="text-sm text-gray-300 pt-2 border-t border-white/10">
                {user?.username} ({user?.role})
              </div>

              <Button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                variant="danger"
                size="md"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Public Header (Not Authenticated)
  return (
    <header className="px-4 sm:px-6 lg:px-10 bg-white/5 backdrop-blur-md transition-all border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Perfect Study"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg object-cover"
          />
          <span className="text-white font-semibold text-lg sm:text-xl">
            Perfect Study
          </span>
        </div>

        {/* Desktop Nav - Public */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={handleLogin}
            className="text-white hover:text-gray-300 transition-colors"
          >
            Login
          </button>
          <Button
            onClick={handleSignup}
            variant="info"
            size="md"
          >
            Sign Up
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown - Public */}
      {isOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="flex flex-col space-y-4 px-4 py-4 text-white">
            <button
              onClick={() => {
                handleLogin();
                setIsOpen(false);
              }}
              className="text-left hover:text-gray-300 transition-colors"
            >
              Login
            </button>
            <Button
              onClick={() => {
                handleSignup();
                setIsOpen(false);
              }}
              variant="info"
              size="md"
              className="w-full"
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;