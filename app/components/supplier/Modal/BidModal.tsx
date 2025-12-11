/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { PartRequest, Quote } from "../../common/interface";
import { supplierPath } from "@/app/utils/api";
import { toast } from "react-toastify";

export default function BidModal({
  open,
  userRequest,
  onClose,
}: {
  open: boolean;
  userRequest?: PartRequest;
  onClose: () => void;
  openOTP?: () => void;
}) {
  useEffect(() => {
    // console.log("userRequest=>", userRequest);
  }, [userRequest]);

  const [formData, setFormData] = useState<Quote>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    try {
      const response = await axios.post(`${supplierPath}/quote`, {
        request_id: userRequest?.id,
        user_id: loggedInUser?.user?.id,
        ...formData,
      });

      if (response?.status === 200) {
        toast.success("Quote Submitted Successfully!");
        onClose();
      }
    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", err.response.data);
        toast.error(
          err.response.data?.detail[0]?.msg || "unable to create quote"
        );
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
      <div className="relative bg-[#061D37] text-white w-[700px] max-w-[100%] bg-[#1d4aa4]/15 backdrop-blur-xl px-10 py-[62px] rounded-[20px] ms-[auto] me-[auto] p-8 shadow-xl border border-white/10 backdrop-blur">
        <button
          onClick={onClose}
          className="absolute top-[10px] right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
        >
          <span className=" text-black ">✕</span>
        </button>
        <form
          className="w-[429px] max-w-[100%] ms-[auto] me-[auto]"
          onSubmit={handleSave}
        >
          <h2 className="text-center text-white text-4xl font-semibold mb-[58px]">
            Quote Now{" "}
          </h2>

          <input
            type="number"
            placeholder="Price"
            name="price_cents"
            onChange={handleChange}
            className="px-[25px] mb-[43px] py-[15px] bg-white text-[19px] leading-[23px] rounded-sm placeholder-[#848484] text-[#848484] focus:outline-none w-full"
          />

          <input
            type="number"
            placeholder="Estimate Days"
            name="eta_days"
            onChange={handleChange}
            className="px-[25px] py-[15px] mb-[43px] bg-white text-[19px] leading-[23px] rounded-sm placeholder-[#848484] text-[#848484] focus:outline-none w-full"
          />

          <textarea
            placeholder="Description"
            name="terms"
            onChange={handleChange}
            className="px-[25px] py-[15px] bg-white mb-[43px] h-[163px] text-[19px] leading-[23px] rounded-sm placeholder-[#848484] text-[#848484] focus:outline-none w-full"
          />

          <button
            className="bg-[#1DA1F2] text-[22px] leading[14px] w-full rounded-sm text-white py-[20px] font-semibold hover:bg-[#1a8cd8] duration-400 cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
