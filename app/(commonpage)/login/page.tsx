/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import { AiFillEye } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

import { FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading ]= useState(false);


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
    setError("");
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
    setError("");
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
 setLoading(true)
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });


      if (response?.data && response.data?.role !== "admin"){

        localStorage.setItem(
          "autoPartsUserData",
          JSON.stringify(response.data)
        );


        localStorage.setItem("loginTime", Date.now().toString());
        localStorage.setItem("lastActivity", Date.now().toString());
        toast.success("Logged-in Successfully");
        if (response.data?.role === "buyer") {
          router.push("/buyer-dashboard");
        } else if (response.data?.role === "supplier"){
          router.push(
            response.data?.profile?.kyc_status === "pending"
              ? "/kyc-info"
              : "/supplier-dashboard"
          );
        }
      }else{
        toast.error("Invalid credentials or unauthorized access");
      }
    } catch (err: any) {

       setLoading(false)

      if (err.response) {
        console.error("Server error:", err.response.data);
        setError(err.response.data.detail || "Login failed");
      } else if (err.request) {
        console.error("No response:", err.request);
        setError("No response from server");
      } else {
        console.error("Error:", err.message);
        toast.error("Unexpected error occurred");
      }
    }
  }

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col overflow-hidden"      
    >
      <Header />
      <div
        className="flex-1 flex justify-center bg-cover bg-center bg-black pt-[90px] "
        style={{
          backgroundImage: "url('/signInNewBg.jpg')",
        }}
      >
        <div className="rounded-xl shadow-lg w-full lg:pt-0 pt-[30px] px-[20px] pb-[20px] flex items-center">        
            <div className="w-[650px]  max-w-[100%] ms-[auto] me-[auto] bg-[#1d4aa4]/15 backdrop-blur-xl  p-[25px] rounded-[20px] shadow-xl flex flex-col items-center border-2 border-borderblue">
              <h2 className="text-white md:text-[30px] text-[20px] font-bold">
                Login
              </h2>

              <form
                className=" w-full flex flex-col gap-[25px] py-[25px]"
                onSubmit={handleLogin}
              >
                {/* Email */}
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className="w-full px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none"
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
                    className="w-full px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-[25px] -translate-y-1/2 text-gray-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <AiFillEye className="text-autoblue" />
                    ) : (
                      <FaEyeSlash className="text-autoblue" />
                    )}
                  </span>
                </div>

                {/* Forgot Password */}
                <Link href="/forgot-password" className=" text-sm text-autoblue hover:underline cursor-pointer font-semibold">
                  Forgot Password ?
                </Link>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                {/* Login Button */}
           
                <button className="flex justify-center  bg-autoblue md:text-base text-sm leading[14px]  rounded-sm text-white md:py-[15px] py-[10px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer">
                     
                  { loading && ( <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-white rounded-full animate-spin me-2"></div>)} Login
          
                </button>
              </form>

              {/* Signup */}
              <div className="text-white font-medium md:text-base text-[15px]  md:leading-[23px] leading-[20px]">
                Are you a new user{" "}
                <Link
                  href="/sign-up"
                  className="text-autoblue cursor-pointer hover:underline text-md font-bold"
                >
                  Sign Up
                </Link>
              </div>
            </div>        
        </div>
      </div>
    </div>
  );
}
