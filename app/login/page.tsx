/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Header from "../components/Header";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { authApiPath } from "@/app/utils/api";
import { FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (/^\s|\s$/.test(value)) {
      setEmailError("Leading or trailing spaces are not allowed");
    } else if (/\s/.test(value)) {
      setEmailError("Spaces are not allowed");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  //Password
  const validatePassword = (value: string) => {
    const errors: string[] = [];

    if (/\s/.test(value)) errors.push("Spaces are not allowed");
    if (value.length < 6) errors.push("Minimum length 6 characters");
    if (!/[A-Z]/.test(value))
      errors.push("Must contain at least one uppercase letter");
    if (!/[a-z]/.test(value))
      errors.push("Must contain at least one lowercase letter");
    if (!/[0-9]/.test(value)) errors.push("Must contain at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      errors.push("Must contain at least one special character");
    setPasswordErrors(errors);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.replace(/\s/g, "");
    setPassword(value);
    validatePassword(value);
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // 🔒 Validate fields before submit
    validateEmail(email);
    validatePassword(password);

    if (!email || emailError || passwordErrors.length > 0 || !password) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await axios.post(`${authApiPath}/auth/login`, {
        email,
        password,
      });

      if (response?.data && response.data.access_token) {
        localStorage.setItem(
          "autoPartsUserData",
          JSON.stringify(response.data)
        );
        localStorage.setItem("loginTime", Date.now().toString());
        localStorage.setItem("lastActivity", Date.now().toString());
        toast.success("Logged-in Successfully");
        if (response.data?.user?.role === "buyer") {
          router.push("/buyer-dashboard");
        } else {
          router.push("/supplier-dashboard");
        }
      }
    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", err.response.data);
        toast.error(err.response.data.detail || "Login failed");
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response:", err.request);
        toast.error("No response from server");
      } else {
        // Something else happened
        console.error("Error:", err.message);
        toast.error("Unexpected error occurred");
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <Header />

      {/* Login Section */}
      <div
        className="flex-1 flex justify-center bg-cover bg-center bg-black pt-[150px] pl-[12rem]"
        style={{
          backgroundImage: "url('/signInNewBg.jpg')",
        }}
      >
        <div className="rounded-xl shadow-lg w-full pt-8 max-w-3xl">
          <ToastContainer />

          <motion.div
            className="w-[600px] bg-blue/40 backdrop-blur-xl p-10 rounded-2xl shadow-xl flex flex-col items-center border-2 border-borderblue"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-white text-3xl font-semibold my-6">Login</h2>

            <form
              className="w-[400px] flex flex-col space-y-6 py-10"
              onSubmit={handleLogin}
            >
              {/* Email */}
              <input
                type="email"
                name="email"
                onChange={handleEmailChange}
                placeholder="Enter email"
                className="px-4 py-3 bg-white text-black focus:outline-none w-full"
              />
              {emailError && (
                <p className="text-red-400 text-sm">{emailError}</p>
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                  className="px-4 py-3  bg-white text-black w-full focus:outline-none"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <AiFillEye className="text-autoblue" />
                  ) : (
                    <FaEyeSlash className="text-autoblue" />
                  )}
                </span>
              </div>

              {/* Forgot Password */}
              <div className="text-md text-autoblue hover:underline cursor-pointer font-semibold">
                Forgot Password ?
              </div>

              {/* Login Button */}
              <button className="mt-1 bg-[#1DA1F2] text-white py-3 font-semibold hover:bg-[#1a8cd8] transition cursor-pointer">
                Login
              </button>
            </form>

            {/* Signup */}
            <div className="mt-5 text-white text-sm">
              Are you a new user{" "}
              <Link
                href="/sign-up"
                className="text-autoblue cursor-pointer hover:underline text-md font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
