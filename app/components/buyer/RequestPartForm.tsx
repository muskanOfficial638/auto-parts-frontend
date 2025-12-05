/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { buyerPath } from "@/app/utils/api";
import axios from "axios";
import { toast } from "react-toastify";

interface PartRequest {
  title: string;
  urgency: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_model_trim: string;
  required_by_date: string;
  attachment: string;
}

export default function RequestPartForm() {
  const [formData, setFormData] = useState<PartRequest>();
  const [attachement, setAttachement] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSave(e: React.FormEvent) {
    console.log("formData", formData);
    e.preventDefault();

    try {
      const response = await axios.post(`${buyerPath}/part-request`, {
        formData,
        role: "buyer",
        is_active: true,
      });

      // console.log("RegisterData:", response.data);
      if (response?.data) {
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
      } else {
        // Something else happened
        console.error("Error:", err.message);
        toast.error("No response from server");
      }
    }
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col">
        <div className="flex justify-center items-start pt-36 pb-20 px-4">
          <div className="w-[1037px] max-w-[100%] bg-[#12151B] rounded-sm px-[30px] pt-[20px] pb-[60px]">
            <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
            <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white mb-[27px]">
              Request a Part
            </h2>

            <form className="space-y-[28px]">
              {/* Product Name */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Product Name*
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>

              {/* Make */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Make*
                </label>
                <select className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none">
                  <option value=""></option>
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Model*
                </label>
                <select className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none">
                  <option value=""></option>
                </select>
              </div>

              {/* Trim */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Trim*
                </label>
                <select className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none">
                  <option value=""></option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Urgency*
                </label>
                <input
                  type="text"
                  className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                />
              </div>

              {/* Required Date */}
              <div>
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Required
                </label>

                <div className="relative">
                  <input
                    type="date"
                    value={attachement}
                    onChange={(e) => setAttachement(e.target.value)}
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-[#CBCBCB] rounded-sm text-[#6C7275] outline-none"
                  />
                  <CalendarDays
                    className="absolute right-3 top-4 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="flex flex-col">
                <label className="text-[#6C7275] md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Image*
                </label>

                <button
                  type="button"
                  className="px-[14px] py-[7px] font-sm leading-[29px] w-[138px]  rounded-sm border border-autoblue text-autoblue hover:border-hoverblue duration-400 cursor-pointer"
                >
                  Browse image
                </button>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="bg-[#1DA1F2] md:text-[22px] text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-[#1a8cd8] duration-400 cursor-pointer"
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
