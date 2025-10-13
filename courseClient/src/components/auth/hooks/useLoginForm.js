// hooks/useLoginForm.js
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

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
  };

  return {
    form,
    validationRules: {
      email: emailValidation,
      password: passwordValidation,
    },
  };
};