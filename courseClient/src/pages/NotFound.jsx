// pages/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import Button from "../components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/10 shadow-2xl">
          {/* 404 Text */}
          <h1 className="text-4xl md:text-9xl font-black bg-clip-text bg-gradient-to-r text-white leading-none mb-4">
            404
          </h1>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-base md:text-lg mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="glass"
              size="lg"
              icon={<ArrowLeft size={20} />}
            >
              Go Back
            </Button>

            <Button
              onClick={() => navigate("/")}
              variant="primary"
              size="lg"
              icon={<Home size={20} />}
            >
              Home
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
              variant="info"
              size="lg"
              icon={<Search size={20} />}
            >
              Dashboard
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-6">Error Code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
