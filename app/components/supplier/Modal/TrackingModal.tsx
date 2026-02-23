/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Quote } from "../../common/interface";
import { toast } from "react-toastify";
import { shippingSubmit } from "@/app/utils/api";
import { useRouter } from "next/navigation";

export default function TrackingModal({
  open,
  onClose,
  quoteId
}: {
  open: boolean;
  onClose: () => void;
  quoteId?: string;
}) {
 
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
 const router = useRouter();
  if (!open) return null;
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
  const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");
    if (loggedInUser) {
        const response = await shippingSubmit(
          {quote_id:quoteId,tracking_details:{...formData}}
        )
    
        if (response.data?.success===true) {
         toast.success("Tracking details submitted successfully");
          onClose();
        }
      }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />
      <div className="p-[20px] scrollbar-none overflow-auto bid-modal-box ">
        <div className="relative bg-brandBlack text-white w-[550px] max-w-[100%] bg-[#1d4aa4]/15 backdrop-blur-xl md:px-10 px-[15px] md:py-[30px] py-[20px] rounded-sm ms-[auto] me-[auto] p-8 shadow-xl  backdrop-blur">
          <button
            onClick={onClose}
            className="absolute top-[10px] right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
          >
            <span className="text-black ">✕</span>
          </button>
          <form className="w-[429px] max-w-[100%] ms-[auto] me-[auto]" onSubmit={handleSubmit}>
            <h2 className="text-white md:text-4xl text-[25px] font-bold md:mb-[38px] mb-[30px]">
              Tracking Detail
            </h2>
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Tracking URL
            </label>
            <input onChange={handleChange} placeholder="Tracking URL" className="w-full bg-white text-black px-4 py-2 rounded-sm mb-4" type="text" name="tracking_url" />
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Tracking Detail
            </label>
            <textarea
              placeholder="Description"
              name="tracking"
              onChange={handleChange}
              className="md:px-[25px] md:py-[15px] px-[10px] py-[12px] bg-white md:mb-[43px] mb-[30px] h-[100px] md:text-[19px] text-[15px] md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
            />

            <button
              className="bg-autoblue w-full md:text-[22px] text-[15px] leading[14px] rounded-sm text-white md:py-[10px] py-[10px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
             
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
