/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { PartRequest, QuoteCreate } from "../../common/interface";
import { supplierPath } from "@/app/utils/api";
import { toast } from "react-toastify";
import { HiOutlineUpload } from "react-icons/hi";
import Image from "next/image";

export default function BidModal({
  open,
  userRequest,
  onClose,
}: {
  open: boolean;
  userRequest?: PartRequest;
  onClose: () => void;
 
}) {

  
  const [files, setFiles] = useState<File[]>([]);



  useEffect( () => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
     setFiles([]);
     
  }, [userRequest]);


  const [formData, setFormData] = useState<QuoteCreate>({
  price_cents: "",
  currency: "ZAR",
  eta_days: "",
  terms: "",
  attachment: [],
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    console.log(formData)
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

   
  if( userRequest?.id && formData?.price_cents && formData.eta_days && formData.terms){
    const formDataPayload = new FormData();
    formDataPayload.append("request_id", userRequest?.id);
    formDataPayload.append("user_id", loggedInUser.user.id);
    formDataPayload.append("price_cents", formData.price_cents);
    formDataPayload.append("currency", formData.currency || "ZAR");
    formDataPayload.append("eta_days", formData.eta_days);
    formDataPayload.append("terms", formData.terms);

    if ( formData?.attachment &&  formData.attachment.length > 0 ) {
      formData.attachment.forEach((file) => {
        formDataPayload.append("attachments", file);
      });
    }else{
      toast.error("Please upload at least one image")
    }
    try {

      console.log(formDataPayload)

      const response = await axios.post(`${supplierPath}/quote/`, formDataPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.status === 200) {
        toast.success("Quote Submitted Successfully!");
        setFiles([])
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
  }else{
    toast.error("Please fill all required fields ")
  }
  }

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files ?? []) as File[];
  setFiles((prev: File[]) => [...prev, ...selectedFiles]);
  setFormData((prev) => ({
    ...prev,
    attachment: [...(prev.attachment || []), ...selectedFiles],
  }));


};

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) =>({ ...prev, attachment:[ ...prev.attachment.filter((_, i) => i !== index)]}));
  };


  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />
      <div className="p-[20px] h-[100vh] max-h-[742px] scrollbar-none overflow-auto bid-modal-box ">
        <div className="relative bg-[#061D37] text-white bg-[#1d4aa4]/15 backdrop-blur-xl  p-[30px]  rounded-[20px] ms-[auto] me-[auto] shadow-xl border border-white/10 backdrop-blur">
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
        <div className="flex flex-col gap-[10px]">
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Image*
                </label>
                {files.length < 5 && (
                <div className="flex flex-row items-center">
                  <input
                    type="file"
                    name="attachment"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    id="multiFile"
                    placeholder="Browse Image"
                    className="hidden"
                  />
                  <label
                    htmlFor="multiFile"
                    className="group flex flex-col items-center justify-center w-full rounded-sm border-2 border-dashed border-gray-300 bg-gradient-to-br from-white to-gray-50 p-4 cursor-pointer transition
      hover:border-blue-500 hover:shadow-md"
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-blue-600 text-2xl transition
        group-hover:bg-blue-100 group-hover:scale-105"
                    >
                      <HiOutlineUpload />
                    </div>

    
                    <p className="mt-4 text-base font-semibold text-gray-800">
                      Click to upload files
                    </p>

    
     
                  </label>
                </div>
                )}
                {/* Selected Files Preview */}
                {files.map((file, index) => {
                  const isImage = file.type.startsWith("image/");

                  return (
                    
                    <li
                      key={index}
                      className="flex items-center justify-between bg-white px-3 py-2 rounded-sm border"
                    >
                      <div className="flex items-center gap-3">
                        {/* ✅ Image Preview */}
                        {isImage ? (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover border"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center border text-sm">
                            📄
                          </div>
                        )}

                        <div className="flex flex-col">
                          <span className="text-sm text-gray-800 font-medium">{file.name}</span>
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 text-sm font-semibold hover:text-red-600"
                      >
                        Remove ✖
                      </button>
                    </li>
                  );
                })}

              </div>


            <button
              className="bg-autoblue md:mt-[30px] mt-[20px] w-full md:text-[20px] text-[15px] leading[14px] rounded-sm text-white  py-[10px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
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
