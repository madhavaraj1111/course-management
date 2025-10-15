// components/auth/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../../store/slices/authSlice";
import { useSignupForm } from "./hooks/useSignupForm";
import Button from "../common/Button";
import logo from "../../assets/PerfectStudy.png";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [success, setSuccess] = useState(false);

  // Custom hook for form management
  const { form, validationRules } = useSignupForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    dispatch(clearError());

    try {
      navigate("/login");
      // Prepare clean data (exclude confirmPassword from API call)
      const { confirmPassword, ...formData } = data;
      const cleanData = {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
      };

      await dispatch(signupUser(cleanData)).unwrap();
      setSuccess(true);
    } catch (err) {
      // Error handled by Redux
      console.error("Signup failed:", err);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black relative overflow-hidden px-4">
        <div className="absolute top-20 left-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-20 w-72 h-24 bg-yellow-400/20 rotate-12 rounded-lg blur-2xl pointer-events-none" />

        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">Success!</h2>
          <p className="text-white/80">Account created successfully. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black relative overflow-hidden px-4">
      <div className="absolute top-20 left-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-20 w-72 h-24 bg-yellow-400/20 rotate-12 rounded-lg blur-2xl pointer-events-none" />
      <div className="absolute bottom-24 left-32 w-40 h-40 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-32 w-80 h-28 bg-yellow-600/10 -rotate-6 rounded-lg blur-3xl pointer-events-none" />

      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <img src={logo} alt="Perfect Study" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg object-cover mb-3 sm:mb-4 bg-white" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-white/60 text-xs sm:text-sm">Start your learning journey today</p>
          </div>

          {/* Server Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
                Username
              </label>
              <input
                type="text"
                {...register("username", validationRules.username)}
                className={`w-full px-3 sm:px-4 py-2 bg-white/10 border ${
                  errors.username ? "border-red-500/70" : "border-white/20"
                } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                  errors.username ? "focus:ring-red-500/50" : "focus:ring-blue-500/50"
                } focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

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
                placeholder="Min 6 chars with upper, lower & number"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", validationRules.confirmPassword)}
                className={`w-full px-3 sm:px-4 py-2 bg-white/10 border ${
                  errors.confirmPassword ? "border-red-500/70" : "border-white/20"
                } rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? "focus:ring-red-500/50" : "focus:ring-blue-500/50"
                } focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-white/70 mb-2">
                Role
              </label>
              <select
                {...register("role", validationRules.role)}
                className={`w-full px-3 sm:px-4 py-2 bg-white/10 border ${
                  errors.role ? "border-red-500/70" : "border-white/20"
                } rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.role ? "focus:ring-red-500/50" : "focus:ring-blue-500/50"
                } focus:border-transparent transition-all text-sm sm:text-base`}
              >
                <option value="student" className="bg-gray-800 text-white">Student</option>
                <option value="admin" className="bg-gray-800 text-white">Admin/Instructor</option>
              </select>
              {errors.role && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading} variant="success" size="md" className="w-full">
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-white/60 text-xs sm:text-sm">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;