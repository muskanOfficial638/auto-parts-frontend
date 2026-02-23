/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetchKycDocs, uploadKycDoc } from "@/app/utils/api";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function KycDetailForm() {
  const [kycData, setKycData] = useState([]);
  // const [loading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<File | null>(null);
  const [kycDoc, setKycDoc] = useState(null as any);
  const [error, setError] = useState("");
  const ALLOWED_TYPES = ["image/jpeg", "application/pdf"];
  const router = useRouter();
  // Load on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
       if (!loggedInUser.id) router.replace("/logout");
       const data = await fetchKycDocs(
        loggedInUser?.id,
      );
      setKycData(data);
      // setIsLoading(false);
    };
    loadInitialData();
  }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData(null);
      setError("");
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPEG images and PDF files are allowed.");
      setFormData(null);
      e.target.value = ""; // reset file input
      return;
    }
    setError("");
    setFormData(file);
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (!loggedInUser.id) router.replace("/logout");
    if (!formData) {
      toast.error("Please select a file first.");
      return;
    }

    const multipartData = new FormData();
    multipartData.append("file", formData, formData.name);
    multipartData.append("user_id", loggedInUser?.user?.id);

    const response = await uploadKycDoc(

      "upload",
      multipartData,
      "POST"
    );

    if (response) {
      toast.success(response?.message);
      // setKycId(response?.kyc_id?.id);
    }
  }

  function EditKycDoc(doc:any){
    setKycDoc(doc)
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser.id) router.replace("/logout");
    if (!formData) {
      toast.error("Please select a file first.");
      return;
    }

    const multipartData = new FormData();
    multipartData.append("file", formData, formData.name);
    multipartData.append("user_id", loggedInUser?.id);
    multipartData.append("kyc_id", kycDoc?.id);

    const response = await uploadKycDoc(

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
                {kycDoc ? "Replace": "Submit"} KYC Detail
              </h2>

              <form
                className="space-y-[28px]"
                onSubmit={kycDoc ? handleUpdate : handleSave}
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
                      {formData && formData.name ? formData.name : kycDoc?.attachment_name || ""}
                    </span>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="bg-autoblue md:text-[22px] text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  {kycDoc ? "Replace document" : "Upload Document"}
                </button>
              </form>
            </div>
             <div className="table-container overflow-auto mt-10">
                <table className="w-full border-0 bg-brandBlack text-white  rounded-sm">
                  <thead>
                    <tr>
                      <th className="bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                        Attachment Name
                      </th>
                      <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                        Status
                      </th>
                      <th className=" bg-autoblue rounded-tr-sm p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                        Action
                      </th>
                    </tr>
                  </thead> 
                  <tbody>
                    {kycData ? (
                      kycData.map((item:any) => (
                        <tr
                          key={item?.id}
                          className=" text-white border-b border-[#2C364A] "
                        >
                          {/* Product */}
                          <td className="md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                            {item?.attachment_name}
                          </td>

                          {/* Status Color */}
                          <td
                            className={`md:text-xs text-[10px] md:leading-[22px] leading-[13px] p-[10px] font-semibold text-center ${
                              item.status === "pending"
                                ? "text-yellow-400"
                                :"text-green-500"
                            }`}
                          >
                            {item?.status}
                          </td>

                          {/* Actions */}
                          <td>
                            <div className="flex gap-3 p-[10px] justify-center">
                              <button onClick={()=>EditKycDoc(item)}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer">
                                <PencilSquareIcon className="h-[20px] w-[20px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h1 className="text-center text-gray-900">
                        No Users found.
                      </h1>
                    )}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
