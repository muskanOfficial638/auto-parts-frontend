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
  const [preview, setPreview] = useState<string | null>(null);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;

    const name = target.name;
    const value = target.value;

    if (target instanceof HTMLInputElement && target.type === "file") {
      const file = target.files?.[0];

      if (!file) return;

      setFormData((prev: any) => ({
        ...prev,
        [name]: file,
      }));

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
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
        toast.error(err?.response?.data?.detail || "unable to create quote");
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />
      <div className="p-[20px] h-[100vh] max-h-[742px] scrollbar-none overflow-auto bid-modal-box ">
        <div className="relative bg-[#061D37] text-white w-[630px] max-w-[100%] bg-[#1d4aa4]/15 backdrop-blur-xl md:px-10 p-[30px]  rounded-[20px] ms-[auto] me-[auto] p-8 shadow-xl border border-white/10 backdrop-blur">
          <button
            onClick={onClose}
            className="absolute top-[10px] right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
          >
            <span className="text-black ">✕</span>
          </button>
          <form
            className="w-[500px] max-w-[100%] ms-[auto] me-[auto]"
            onSubmit={handleSave}
          >
            <h2 className="text-white md:text-3xl text-[20px] font-bold md:mb-[30px] mb-[20px]">
              Quote Now{" "}
            </h2>
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Price Cents*
            </label>
            <input
              type="text"
              placeholder="Price(in numeric format)"
              name="price_cents"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              onChange={handleChange}
              className=" px-[20px] py-[13px] md:mb-[30px] mb-[20px] bg-white md:text-base text-sm md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
            />
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Estimated Days*
            </label>
            <input
              type="text"
              placeholder="Estimate Days(in numeric format)"
              name="eta_days"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={handleChange}
              required
              className="px-[20px] py-[12px] md:mb-[30px] mb-[20px] bg-white md:text-base text-sm md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
            />
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Description*
            </label>
            <textarea
              placeholder="Description"
              name="terms"
              onChange={handleChange}
              minLength={2}
              maxLength={280}
              required
              className=" px-[20px] py-[12px] bg-white md:mb-[30px] mb-[20px] h-[125px] md:text-base text-sm md:leading-[23px] leading-[20px] rounded-sm placeholder-grayMedium text-grayMedium focus:outline-none w-full"
            />
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block">
              Upload Image
            </label>
            <div className="flex items-center gap-[15px] md:mb-[30px] mb-[20px] pt-[16px]">
            <div className="flex flex-row items-center  ">
              <input
                type="file"
                name="attachment"
                accept="image/*"
                onChange={handleChange}
                placeholder="Browse Image"
                className="px-[14px] py-[7px] placeholder-Gray font-sm leading-[29px] w-[111px] rounded-sm border border-autoblue text-autoblue hover:border-hoverblue duration-400 cursor-pointer cursor-pointer"
              />
            </div>
            {preview && (
              <div className=" flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Selected image"
                  className="w-[50px] h-[50px] object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(preview);
                    setPreview(null);
                    setFormData((prev: any) => ({
                      ...prev,
                      attachment: null,
                    }));
                  }}
                  className="text-sm text-red-500 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
            </div>

            <button
              className="bg-autoblue w-full md:text-[20px] text-[15px] leading[14px] rounded-sm text-white  py-[10px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
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
