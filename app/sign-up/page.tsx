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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [vatError, setVatError] = useState("");
  const [name, setName] = useState("");
  const [vat_number, setVATNumber] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

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
    setError("");
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
    setError("");
    validatePassword(value);
  };

  const handleSelectChange = (value: string) => {
    // console.log("value",value)
    setRole(value);
    setError("");
  };

  const validateVAT = (value: string) => {
    const vatRegex = /^[A-Za-z0-9]{8,15}$/;

    if (!vatRegex.test(value)) {
      setVatError(
        "VAT number must be 8–15 characters and contain only letters or numbers"
      );
      return;
    } else {
      setVatError("");
    }
  };

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!name || !role || !email || !password) {
        setError("Please fill in all required fields.");
        return;
      }
      // 🔒 Validate fields before submit
      validateEmail(email);
      validatePassword(password);
      if (vat_number) validateVAT(vat_number);
      const nameRegex = /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/;

      if (name && !nameRegex.test(name)) {
        setNameError("Invalid Name Characters");
        return;
      }

      if (name?.length > 25) {
        setNameError("Name cannot be more than 25 character long");
        return;
      }
      if (name?.length < 2) {
        setNameError("Name cannot be less than 2 character short");
        return;
      }

      if (!email || emailError || passwordErrors.length > 0) {
        setError("Please fix the errors before submitting");
        return;
      }

      if (!isTermsChecked) {
        toast.error("You must accept the Terms of Service.");
        return;
      }

      const response = await axios.post(`${authApiPath}/auth/register`, {
        email,
        password,
        name,
        vat_number: role === "buyer" ? vat_number : "",
        company_name,
        role,
        is_active: true,
        kyc_status: role === "supplier" ? "pending" : "",
      });

      // console.log("RegisterData:", response.data);
      if (response?.data) {
        toast.success("Signed-up Successfully");
        router.push("/login");
      }
    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", err.response.data);
        toast.error(err.response.data?.detail[0]?.msg || "Signup failed");
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response:", err.request);
        toast.error("No response from server");
        setError("No response from server");
      } else {
        // Something else happened
        console.error("Error:", err.message);
        toast.error("No response from server");
        setError("Unexpected error occurred");
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

      {/* signup Section */}
      <div
        className="flex-1 flex justify-center bg-cover bg-center bg-black pt-[100px] pr-[8rem]"
        style={{
          backgroundImage: "url('/signUpNewBg.jpg')",
        }}
      >
        <div className="rounded-xl shadow-lg w-full pt-8 max-w-3xl">
          <ToastContainer />
          <motion.div
            className="w-[900px] bg-blue/40 backdrop-blur-xl p-10 rounded-2xl shadow-xl flex flex-col items-center border-2 border-borderblue"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-white text-3xl font-semibold mb-6">Sign Up</h2>

            <form
              className="grid grid-cols-2 gap-8 w-[800px]"
              onSubmit={handleRegister}
            >
              {/* Left Column */}
              <div className="flex flex-col">
                <input
                  type="text"
                  name="name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  placeholder="Name*"
                  className="col-span-1 bg-white text-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>

              <input
                type="text"
                name="company"
                placeholder="Company"
                onChange={(e) => setCompanyName(e.target.value)}
                className="col-span-1 bg-white text-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={role}
                name="role"
                required
                onChange={(e) => handleSelectChange(e.target.value)}
                className="col-span-1 bg-white text-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select role*</option>
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
              </select>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="vat_number"
                  disabled={role == "supplier"}
                  onChange={(e) => {
                    setVATNumber(e.target.value);
                    setError("");
                    setVatError("");
                  }}
                  placeholder="VAT Number"
                  className="col-span-1 bg-white text-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                {vatError && (
                  <p className="text-red-500 text-sm mt-1">{vatError}</p>
                )}
              </div>
              <input
                type="text"
                name="email"
                required
                onChange={handleEmailChange}
                placeholder="Enter email*"
                className="col-span-2 bg-white text-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
              <div className="relative col-span-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  onChange={handlePasswordChange}
                  placeholder="Enter password*"
                  className="w-full bg-white text-gray-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? (
                    <AiFillEye />
                  ) : (
                    <FaEyeSlash className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>

              {/* ✅ Live password validation feedback */}
              {password && (
                <ul className="mt-2 text-sm">
                  <li
                    className={
                      /\s/.test(password) ? "text-red-500" : "text-green-600"
                    }
                  >
                    Spaces are not allowed
                  </li>
                  <li
                    className={
                      password.length >= 6 ? "text-green-600" : "text-red-500"
                    }
                  >
                    Minimum length 6 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(password) ? "text-green-600" : "text-red-500"
                    }
                  >
                    At least one uppercase letter
                  </li>
                  <li
                    className={
                      /[a-z]/.test(password) ? "text-green-600" : "text-red-500"
                    }
                  >
                    At least one lowercase letter
                  </li>
                  <li
                    className={
                      /[0-9]/.test(password) ? "text-green-600" : "text-red-500"
                    }
                  >
                    At least one number
                  </li>
                  <li
                    className={
                      /[!@#$%^&*(),.?":{}|<>]/.test(password)
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    At least one special character
                  </li>
                </ul>
              )}

              <div className="col-span-2 flex justify-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={isTermsChecked}
                  onChange={() => setIsTermsChecked(!isTermsChecked)}
                  className="accent-blue-600 w-4 h-4"
                />
                <div className="flex flex-row justify-between gap-[22rem]">
                  <label htmlFor="terms" className="text-sm text-gray-400">
                    I agree to the{" "}
                    <a href="#" className="underline text-autoblue">
                      Terms & Conditions
                    </a>
                  </label>
                  <div className="text-white text-sm">
                    Are you already a user{" "}
                    <Link
                      href="/login"
                      className="text-autoblue cursor-pointer hover:underline"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
              {error && <span className="text-red-500">{error}</span>}
              <button
                type="submit"
                className="col-span-2 bg-autoblue hover:bg-hoverblue text-white py-3 mt-4 font-semibold cursor-pointer"
              >
                Create Account
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
