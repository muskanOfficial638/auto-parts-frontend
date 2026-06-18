/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
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
  const [loading, setLoading] = useState(false);
  const [submitProcess, setSubmitProcess] = useState(false);


    useEffect(() => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (loggedInUser?.role === "buyer") {
        router.replace("/buyer-dashboard");
      }
      if(loggedInUser?.role === "supplier"){ 
        router.replace("/supplier-dashboard")
      }
    }, [router]);

  // Email Validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (/^\s|\s$/.test(value)) {
      setEmailError("Spaces are not allowed");
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
    if (value.length < 8) errors.push("Minimum length 8 characters");
    if (value.length > 20) errors.push("Maximum length 20 characters");
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

    if(submitProcess){
      return
    }
      setSubmitProcess(true);
    try {
       setLoading(true)
      if (!name || !role || !email || !password) {
        setError("Please fill in all required fields.");
        setSubmitProcess(false);
         setLoading(false)
        return;
      }
      // 🔒 Validate fields before submit
      validateEmail(email);
      validatePassword(password);
      if (vat_number) validateVAT(vat_number);
      const nameRegex = /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/;

      if (name && !nameRegex.test(name)) {
         setLoading(false)
        setNameError("Invalid Name Characters");
          setSubmitProcess(false);  
        return;
      }

      if (name?.length > 25) {
         setLoading(false)
          setSubmitProcess(false);
        setNameError("Name cannot be more than 25 character long");
        return;
      }
      if (name?.length < 2) {
         setLoading(false)
          setSubmitProcess(false);
        setNameError("Name cannot be less than 2 character short");
        return;
      }


      if (  vat_number.length > 20 || vat_number.length < 8) {
         setLoading(false)
          setSubmitProcess(false);
        setVatError("VAT number must be between 8 and 20 characters long");
        return;
      }
        if(email?.length > 50){
          setLoading(false)
            setSubmitProcess(false);
          setEmailError("Email cannot be more than 50 characters long");
          return;
        }

      if (!email || emailError || passwordErrors.length > 0) {
         setLoading(false)
            setSubmitProcess(false);
        setError("Please fix the errors before submitting");
        return;
      }


      if (!isTermsChecked) {
         setLoading(false)  
            setSubmitProcess(false);
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
         setLoading(false)
         setSubmitProcess(false);
        toast.success("Signed-up Successfully");
        router.push("/login");
      }
    } catch (err: any) {
       setLoading(false)
       setSubmitProcess(false);
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
    <div
      className="min-h-screen bg-black text-white flex flex-col overflow-hidden"     
    >
      {/* Header */}
      <Header />

      {/* signup Section */}
      <div
        className="flex-1 flex justify-center bg-cover bg-center bg-black pt-[100px] "
        style={{
          backgroundImage: "url('/signUpNewBg.jpg')",
        }}
      >
        <div className="rounded-xl shadow-lg w-full p-[20px] flex items-center ">
         
          <motion.div
            className="w-[650px] ms-[auto] me-[auto]  max-w-full bg-[#1d4aa4]/15 backdrop-blur-xl  p-[25px]  rounded-[20px] shadow-xl flex flex-col items-center border-2 border-borderblue"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-white md:text-[30px] text-[20px] font-bold md:mb-[25px] mb-[20px]">Sign Up</h2>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-[25px] w-full"
              onSubmit={handleRegister}
            >
              {/* Left Column */}
              <div className="md:col-span-1 col-span-2">
                <input
                  type="text"
                  name="name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  placeholder="Name*"
                  className=" w-full px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none"
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>

              <input
                type="text"
                name="company"
                required
                placeholder="Company"
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-max md:col-span-1 col-span-2 px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none "
              />

              <select
                value={role}
                name="role"
                required
                onChange={(e) => handleSelectChange(e.target.value)}
                className="h-[40px] md:col-span-1 col-span-2 cursor-pointer px-[15px] py-[10px] bg-white text-sm rounded-sm text-grayMedium outline-none
                "
              >
                <option value="">Select role*</option>
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
              </select>
       {role=='buyer' && (
              <div className="md:col-span-1 col-span-2">
                <input
                  type="text"
                  name="vat_number"
                 
                  onChange={(e) => {
                    setVATNumber(e.target.value);
                    setError("");
                    setVatError("");
                  }}
                  placeholder="VAT Number"
                  className="w-full px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none "
                />

                {vatError && (
                  <p className="text-red-500 text-sm mt-1">{vatError}</p>
                )}
              </div>
              )}
              <input
                type="text"
                name="email"
                required
                onChange={handleEmailChange}
                placeholder="Enter email*"
                className="col-span-2  px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none"
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
                  className="w-full px-[15px] py-[10px] bg-white text-sm rounded-sm placeholder-grayMedium text-grayMedium outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-[25px] -translate-y-1/2 text-gray-400 cursor-pointer"
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
                      password.length >= 8 ? "text-green-600" : "text-red-500"
                    }
                  >
                    Minimum length 8 characters
                  </li>
                     {password.length > 20 && <li
                    className={
                       "text-red-500"
                    }
                  >
                    Maximum length 20 characters
                  </li> }
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

              <div className="col-span-2 flex justify-center md:items-center  items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={isTermsChecked}
                  onChange={() => setIsTermsChecked(!isTermsChecked)}
                  className="accent-blue-600 md:mt-[0] mt-[5px] w-4 h-4"
                />
                <div className="flex md:flex-row flex-col md:gap-[0] gap[35px] justify-between w-full">
                  <label htmlFor="terms" className=" text-sm text-white tracking-[1px]">
                    I agree to the{" "}
                    <a href="#" className="underline text-autoblue">
                      Terms & Conditions
                    </a>
                  </label>
                  <div className="text-white text-sm leading">
                    Are you already a user{" "}
                    <Link
                      href="/login"
                      className="text-autoblue text-sm font-bold cursor-pointer hover:underline"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
              {error && <span className="text-red-500">{error}</span>}
              <button
                type="submit"
                className="col-span-2 flex justify-center bg-autoblue md:text-base text-sm leading[14px] rounded-sm text-white md:py-[15px] py-[10px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
              >
              {loading && (<div className="w-8 h-8 border-4 border-blue-500   border-t-transparent border-white rounded-full animate-spin me-2"></div>)}  
                Create Account
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
