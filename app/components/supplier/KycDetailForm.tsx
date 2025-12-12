"use client";
import { uploadKycDoc } from "@/app/utils/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function KycDetailForm() {
  const [formData, setFormData] = useState<File | null>(null);
  const [kycId, setKycId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.files?.[0] ?? null);
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (!formData) {
      toast.error("Please select a file first.");
      return;
    }

    const multipartData = new FormData();
    multipartData.append("file", formData, formData.name);
    multipartData.append("user_id", loggedInUser?.user?.id);

    const response = await uploadKycDoc(
      loggedInUser?.access_token,
      "upload",
      multipartData,
      "POST"
    );

    if (response) {
      toast.success(response?.message);
      setKycId(response?.kyc_id?.id);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (!formData) {
      toast.error("Please select a file first.");
      return;
    }

    const multipartData = new FormData();
    multipartData.append("file", formData, formData.name);
    multipartData.append("user_id", loggedInUser?.user?.id);
    multipartData.append("kyc_id", kycId);

    const response = await uploadKycDoc(
      loggedInUser?.access_token,
      "update",
      multipartData,
      "PATCH"
    );

    if (response) {
      toast.success(response?.message);
    }
  }

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
                Submit KYC Detail
              </h2>

              <form
                className="space-y-[28px]"
                onSubmit={kycId ? handleUpdate : handleSave}
              >
                {/* Image Upload */}
                <div className="flex flex-col">
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Upload KYC doc
                  </label>
                  <div className="flex flex-row">
                    <input
                      type="file"
                      name="file"
                      accept="image/jpeg, application/pdf"
                      onChange={handleChange}
                      placeholder="Browse Image"
                      className="px-[14px] py-[7px] font-sm leading-[29px] w-[138px] rounded-sm border border-autoblue text-autoblue hover:border-hoverblue duration-400 cursor-pointer cursor-pointer"
                    />
                    <span className="justify-center p-4">
                      {formData && formData.name ? formData.name : ""}
                    </span>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="bg-autoblue md:text-[22px] text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  {kycId ? "Replace document" : "Upload Document"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
