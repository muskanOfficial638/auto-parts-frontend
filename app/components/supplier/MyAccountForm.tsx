/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateProfile, viewProfile } from "@/app/utils/api";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
export interface UserProfile {
  company_name: string;
  email: string;
  user_name: string;
  vat_number?: string;
}

export default function MyAccountForm() {
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

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");

      if (loggedInUser?.user) {
        viewProfile(
          loggedInUser.user.id,
          loggedInUser.access_token
        ).then((data: any) => {
          console.log("data", data);
          setProfileData({
            user_name: data?.user_name || "",
            email: data?.email || "", 
            company_name: data?.company_name || "",
            vat_number: data?.vat_number || "",
            
          });
        });
      }
    }
  }, []);

  // Handle text field changes
  const handleProfileChange = (e: any) => {
    const { name, value } = e.target;
      setProfileData((prev: any) => ({ ...prev, [name]: value }));
    
  };

  // Handle password inputs
  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
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

      const res = await updateProfile(
        loggedInUser?.user.id,
        loggedInUser?.access_token,
        payload
      );
       if(res?.success){
       toast.success("Profile updated successfully!");
       viewProfile(loggedInUser.user.id, loggedInUser.access_token);
       }else{
        toast.error(res?.details);
       }

    } catch (error) {
      console.log("Update Error:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <ToastContainer />

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
          <div className="w-[1037px] max-w-[100%] bg-brandBlack rounded-sm px-[30px] pt-[20px] pb-[60px]">
            <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
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
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
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
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Email
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder={profileData?.email || ""}
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray outline-none"
                  />
                </div>
                <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white md:mb-[27px] mb-[15px] md:mt-[46px] mt-[30px] ">
                  Password
                </h2>
                {/* Trim */}
                <div>
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Old Password
                  </label>
                  <input
                    type="password"
                    placeholder="***********"
                    name="old_password"
                     autoComplete="new-password"
                    onChange={handlePasswordChange}
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] placeholder-Gray  text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
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
                    className="w-full  placeholder-Gray py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                  />
                </div>
                <div>
                  <label className="text-Gray  md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Repeat New Password
                  </label>
                  <input
                    type="password"
                    placeholder="***********"
                    name="confirm_password"
                    onChange={handlePasswordChange}
                    className="w-full py-[8px] placeholder-Gray px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                  />
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="bg-autoblue md:text-[22px] text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
