/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  useState } from "react";
import Header from "@/app/components/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  if(!token) {router.replace("/login"); return;}

  // ---------------- Password Validation ----------------
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (
    value: string,
    mainPassword: string
  ) => {
    if (!value) {
      setConfirmError("Confirm password is required");
    } else if (value !== mainPassword) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  // ---------------- Handlers ----------------
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    validateConfirmPassword(confirmPassword, value);
  };

  const handleConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value, password);
  };


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

 

    validatePassword(password);
    validateConfirmPassword(confirmPassword, password);

    if (
      !password ||
      !confirmPassword ||
      passwordError ||
      confirmError
    ) {
      toast.error("Please fix the errors first");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `/api/auth/reset-password`,
        {token:token,
         new_password: password
        }
      );

      if (response?.data?.message) {
        toast.success("Password updated successfully");
     
        setLoading(false);

        router.push("/login");
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);

      if (err.response) {
        console.error(err.response.data);
        toast.error("Server error");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      <Header />

      <div
        className="flex-1 flex justify-center bg-cover bg-center bg-black pt-[90px]"
        style={{
          backgroundImage: "url('/signInNewBg.jpg')",
        }}
      >
        <div className="rounded-xl shadow-lg w-full lg:pt-0 pt-[30px] px-[20px] pb-[20px] flex items-center">

          <div className="w-[700px] max-w-[100%] ms-auto me-auto bg-[#1d4aa4]/15 backdrop-blur-xl md:px-10 px-[30px] py-[40px] rounded-[20px] shadow-xl flex flex-col items-center border-2 border-borderblue">

            <h2 className="text-white md:text-4xl text-[25px] font-bold">
              Reset Password
            </h2>

            <form
              className="w-full flex flex-col gap-[30px] py-[30px]"
              onSubmit={handleSubmit}
            >
              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Enter new password"
                  onChange={handlePasswordChange}
                  className="px-[20px] py-[13px] bg-white md:text-base text-sm rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
                />

                {passwordError && (
                  <p className="text-red-400 text-sm mt-1">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleConfirmChange}
                  className="px-[20px] py-[13px] bg-white md:text-base text-sm rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
                />

                {confirmError && (
                  <p className="text-red-400 text-sm mt-1">
                    {confirmError}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                className={`flex justify-center md:text-[20px] text-[15px] rounded-sm text-white md:py-[15px] py-[10px] font-semibold duration-400 cursor-pointer bg-autoblue hover:bg-hoverblue
                `}
              >
                {loading && (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin me-2"></div>
                )}

                 Reset Password
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-white font-medium md:text-base text-sm">
              Back to{" "}
              <Link
                href="/login"
                className="text-autoblue cursor-pointer hover:underline font-bold"
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