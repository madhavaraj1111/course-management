// components/auth/Login.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useLoginForm } from "./hooks/useLoginForm";
import Button from "../common/Button";
import logo from "../../assets/PerfectStudy.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  // Custom hook for form management
  const { form, validationRules } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // Navigate when user is authenticated
  useEffect(() => {
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [user, token, navigate]);

  const onSubmit = async (data) => {
    dispatch(clearError());

    try {
  const res = await dispatch(
    loginUser({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    })
  ).unwrap();

  if (res?.token) {
    navigate("/", { replace: true });
  }
} catch (err) {
  console.error("Login failed:", err);
}

  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black relative overflow-hidden px-4">
      {/* Gold accents */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-20 w-72 h-24 bg-yellow-400/20 rotate-12 rounded-lg blur-2xl pointer-events-none" />
      <div className="absolute bottom-24 left-32 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-32 w-80 h-28 bg-yellow-600/10 -rotate-6 rounded-lg blur-3xl pointer-events-none" />

      <div className="max-w-md w-full">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img
              src={logo}
              alt="Perfect Study"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg object-cover mb-3 sm:mb-4 bg-white"
            />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60 text-xs sm:text-sm">
              Login to continue learning
            </p>
          </div>

          {/* Server Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", validationRules.email)}
                className={`w-full px-3 sm:px-4 py-2 bg-white/10 border ${
                  errors.email ? "border-red-500/70" : "border-white/20"
                } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                  errors.email ? "focus:ring-red-500/50" : "focus:ring-blue-500/50"
                } focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", validationRules.password)}
                className={`w-full px-3 sm:px-4 py-2 bg-white/10 border ${
                  errors.password ? "border-red-500/70" : "border-white/20"
                } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-500/50" : "focus:ring-blue-500/50"
                } focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="info"
              size="md"
              className="w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-white/60 text-xs sm:text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;