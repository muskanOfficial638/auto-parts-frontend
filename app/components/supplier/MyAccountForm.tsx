/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateProfile, viewProfile } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface UserProfile {
  company_name: string;
  email: string;
  user_name: string;
  vat_number?: string;
}

export default function MyAccountForm() {
  const [loading, setLoading] = useState(true);
   const [isEdit, SetEdit] = useState(false)
   const [submitProcess, setSubmitProcess] = useState(false);
  
  const [profileData, setProfileData] = useState<UserProfile>({
    user_name: "",
    email: "",
    company_name: "",
    vat_number: "",
  });

  const [passwords, setPasswords] = useState({
    old_password: "",
    password_hash: "",
    confirm_password: "",
  });
const router = useRouter();
  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
     
     if (!loggedInUser.id) router.replace("/logout");
      if (loggedInUser) {
        viewProfile(
          loggedInUser.id,
     
        ).then((data: any) => {
          setLoading(false);
          setProfileData({
            user_name: data?.user_name || "",
            email: data?.email || "",
            company_name: data?.company_name || "",
            vat_number: data?.vat_number || "",

          });
        });
      }
    }
  }, [router]);

  // Handle text field changes
  const handleProfileChange = (e: any) => {
     SetEdit(true)
    const { name, value } = e.target;
    setProfileData((prev: any) => ({ ...prev, [name]: value }));

  };

  // Handle password inputs
  const handlePasswordChange = (e: any) => {
    SetEdit(true)
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

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
    return errors.length>0
  };

  // Submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!isEdit) return;
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (!loggedInUser.id) router.replace("/logout");
      if(passwords.password_hash && validatePassword(passwords.password_hash)){
         toast.error("Invalid password format.");
         return;
      }

    if (passwords.password_hash !== passwords.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    try { 


      const payload = {
        user_name: profileData.user_name,
        company_name: profileData.company_name,
        vat_number: profileData.vat_number || "",
        old_password: passwords.old_password || "",
        password_hash: passwords.password_hash || "",
        confirm_password: passwords.confirm_password || "",
      };

         if(submitProcess){
         return
       }

      setSubmitProcess(true);

      const res = await updateProfile(
        loggedInUser?.id, 
        payload
      );
      if (res?.success) {
        toast.success("Profile updated successfully!");
        setSubmitProcess(false);
        viewProfile(loggedInUser.id);
        setPasswords({
    old_password: "",
    password_hash: "",
    confirm_password: "",
  })
      } else {
        toast.error(res?.details);
        setSubmitProcess(false);
      }

    } catch (error) {
      console.log("Update Error:", error);
      toast.error("Failed to update profile.");
      setSubmitProcess(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col">
        <div className="flex justify-center items-start pt-36 pb-20 px-4">
              {loading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

           ): (
          <div className="w-[850px] max-w-[100%] bg-brandBlack rounded-sm p-[30px]">
            <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white mb-[27px]">
              Account Details
            </h2>
      
            <form className="space-y-[28px]" onSubmit={handleSubmit}>
              {/* Product Name */}
              <div>
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  value={profileData?.user_name || ""}
                  onChange={handleProfileChange}
                  className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                />
              </div>

              {/* Make */}
              <div>
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={profileData?.company_name || ""}
                  onChange={handleProfileChange}
                  className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                />
              </div>

              {/* Model */}
              <div>
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Email
                </label>
                <div className="w-full py-[8px] px-[15px]  bg-white text-sm   border border-LightNeutral rounded-sm text-Gray">
                  {profileData?.email || ""}
                </div>
              </div>
              <h2 className="md:text-[23px] text-text-lg leading-[30px] font-semibold text-white md:mb-[20px] mb-[15px] md:mt-[46px] mt-[30px] ">
                Password
              </h2>
              {/* Trim */}
              <div>
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="***********"
                  name="old_password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  className="w-full py-[8px] px-[15px]  bg-white text-sm  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                />
              </div>

              <div>
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="***********"
                  name="password_hash"
                  onChange={handlePasswordChange}
                  className="w-full py-[8px] px-[15px]  bg-white md:text-base text-sm leading-[13px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                />
              </div>

                {passwords.password_hash && (
                <ul className="mt-2 text-sm">
                  <li
                    className={
                      /\s/.test(passwords.password_hash) ? "text-red-500" : "text-green-600"
                    }
                  >
                    Spaces are not allowed
                  </li>
                  <li
                    className={
                      passwords.password_hash.length >= 6 ? "text-green-600" : "text-red-500"
                    }
                  >
                    Minimum length 6 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(passwords.password_hash) ? "text-green-600" : "text-red-500"
                    }
                  >
                    At least one uppercase letter
                  </li>
                  <li
                    className={
                      /[a-z]/.test(passwords.password_hash) ? "text-green-600" : "text-red-500"
                    }
                  >
                    At least one lowercase letter
                  </li>
                  <li
                    className={
                      /[0-9]/.test(passwords.password_hash) ? "text-green-600" : "text-red-500"
                    }
                  >
                    At least one number
                  </li>
                  <li
                    className={
                      /[!@#$%^&*(),.?":{}|<>]/.test(passwords.password_hash)
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    At least one special character
                  </li>
                </ul>
              )}
              <div>
                <label className="text-Gray  md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="***********"
                  name="confirm_password"
                  onChange={handlePasswordChange}
                  className="w-full py-[8px] px-[15px]  bg-white text-sm leading-[13px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
             
                className={`flex justify-center md:text-base text-[15px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold  duration-400 ${isEdit?"cursor-pointer bg-autoblue hover:bg-hoverblue ":"cursor-not-allowed bg-gray-500"}  `}
              >
                { submitProcess && ( <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-white rounded-full animate-spin me-2"></div>)} Save Changes
              </button>
            </form>
           
          </div>
          )}
        </div>
           
      </div>
    </div>
  );
}
