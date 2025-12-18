/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Quote } from "../../common/interface";
import { toast } from "react-toastify";

export default function TrackingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />
      <div className="p-[20px] h-[100vh] max-h-[742px] scrollbar-none overflow-auto bid-modal-box ">
        <div className="relative bg-[#061D37] text-white w-[700px] max-w-[100%] bg-[#1d4aa4]/15 backdrop-blur-xl md:px-10 px-[30px] md:py-[62px] py-[40px] rounded-[20px] ms-[auto] me-[auto] p-8 shadow-xl border border-white/10 backdrop-blur">
          <button
            onClick={onClose}
            className="absolute top-[10px] right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
          >
            <span className="text-black ">✕</span>
          </button>
          <form className="w-[429px] max-w-[100%] ms-[auto] me-[auto]">
            <h2 className="text-white md:text-4xl text-[25px] font-bold md:mb-[58px] mb-[30px]">
              Track the quote
            </h2>

            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Quote Information
            </label>
            <textarea
              placeholder="Description"
              name="terms"
              onChange={handleChange}
              className="md:px-[25px] md:py-[15px] px-[20px] py-[12px] bg-white md:mb-[43px] mb-[30px] h-[163px] md:text-[19px] text-[15px] md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
            />

            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Tracking Detail
            </label>
            <textarea
              placeholder="Description"
              name="terms"
              onChange={handleChange}
              className="md:px-[25px] md:py-[15px] px-[20px] py-[12px] bg-white md:mb-[43px] mb-[30px] h-[163px] md:text-[19px] text-[15px] md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
            />

            <button
              className="bg-autoblue w-full md:text-[22px] text-[15px] leading[14px] rounded-sm text-white md:py-[20px] py-[10px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
              onClick={()=>toast.error("Sorry, Work is pending from backend!")}
              type="button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
