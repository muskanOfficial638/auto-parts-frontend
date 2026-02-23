/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";

import { toast } from "react-toastify";
import axios from "axios";


import Link from "next/link";

export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [reSend, setReSend] = useState<number>(0);

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
    
  };

useEffect(() => {
  if (reSend <= 0) return;

  const interval = setInterval(() => {
    setReSend((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [reSend]);


  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();
    
if(reSend) return;

    validateEmail(email);
    if (!email || emailError) {
      toast.error("Please fix the errors before submitting");
      return;
    }
 setLoading(true)
    try {
      const response = await axios.post(`/api/auth/forgot-password`, {
        email,
  
      });


      if (response?.data && response.data?.message){
        toast.success("Password reset link sent to email");
        setReSend(60)
        setLoading(false)
    


      }else{

        toast.error("We couldn’t find an account with that email. ");
        setLoading(false)
      }
    } catch (err: any) {

       setLoading(false)

      if (err.response) {
        console.error("Server error:", err.response.data);
       
      } else if (err.request) {
        console.error("No response:", err.request);
     
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
            <div className="w-[700px]  max-w-[100%] ms-[auto] me-[auto] bg-[#1d4aa4]/15 backdrop-blur-xl md:px-10 px-[30px] py-[40px] rounded-[20px] shadow-xl flex flex-col items-center border-2 border-borderblue">
              <h2 className="text-white md:text-4xl text-[25px] font-bold">
               Forgot Password
              </h2>

              <form
                className=" w-full flex flex-col gap-[30px] py-[30px]"
                onSubmit={handleLogin}
              >
                {/* Email */}
                <input
                  type="email"
                  name="email"
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className="px-[20px] py-[13px] bg-white md:text-base text-sm md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
                />
                {emailError && (
                  <p className="text-red-400 text-sm">{emailError}</p>
                )}


                <button className={`flex justify-center   md:text-[20px] text-[15px] leading[14px]  rounded-sm text-white md:py-[15px] py-[10px] font-semibold  duration-400 ${reSend>0 ?'bg-gray-500 hover:bg-gray-500 cursor-not-allowed': ' cursor-pointer bg-autoblue hover:bg-hoverblue ' } `}>                 
                  { loading && ( <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-white rounded-full animate-spin me-2"></div>)} {reSend?reSend + 's':'Send'}
                </button>
              </form>

              {/* Signup */}
              <div className="text-white font-medium md:text-base text-sm  md:leading-[23px] leading-[20px]">
               Back to {" "}
                <Link
                  href="/login"
                  className="text-autoblue cursor-pointer hover:underline text-md font-bold"
                >
                 Login
                </Link>
              </div>
            </div>        
        </div>
      </div>
    </div>
  );
}
