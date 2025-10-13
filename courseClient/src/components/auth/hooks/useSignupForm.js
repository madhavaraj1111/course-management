// hooks/useSignupForm.js
import { useForm } from "react-hook-form";

export const useSignupForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
    mode: "onBlur",
  });

  const { watch } = form;
  const password = watch("password");

  const usernameValidation = {
    required: "Username is required",
    minLength: {
      value: 3,
      message: "Username must be at least 3 characters",
    },
    maxLength: {
      value: 30,
      message: "Username must not exceed 30 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9_-]+$/,
      message: "Username can only contain letters, numbers, underscores, and hyphens",
    },
  };

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
    maxLength: {
      value: 100,
      message: "Email must not exceed 100 characters",
    },
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    maxLength: {
      value: 50,
      message: "Password must not exceed 50 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  };

  const confirmPasswordValidation = {
    required: "Please confirm your password",
    validate: (value) =>
      value === password || "Passwords do not match",
  };

  const roleValidation = {
    required: "Role is required",
  };

  return {
    form,
    validationRules: {
      username: usernameValidation,
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation,
      role: roleValidation,
    },
  };
};