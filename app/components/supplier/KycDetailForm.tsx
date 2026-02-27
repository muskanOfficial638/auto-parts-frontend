/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { fetchKycDocs, uploadKycDoc } from "@/app/utils/api";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { HiOutlineUpload } from "react-icons/hi";

interface KycItem {
  id: number;
  attachment_name: string;
  attachment_url?: string;
  status: string;
}

export default function KycDetailForm() {
  const [kycData, setKycData] = useState<KycItem[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [kycDoc, setKycDoc] = useState<KycItem | null>(null);
  const router = useRouter();

  const ALLOWED_TYPES = ["image/jpeg", "application/pdf"];

  // ================= Load Data =================
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");

      if (!loggedInUser?.id) {
        router.replace("/logout");
        return;
      }

      const data = await fetchKycDocs(loggedInUser.id);
      setKycData(data || []);
    };

    loadInitialData();
  }, [router]);

  // ================= File Handlers =================
  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles: File[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (ALLOWED_TYPES.includes(file.type)) {
        validFiles.push(file);
      } else {
        toast.error(`${file.name} not allowed`);
      }
    });

    setFiles(validFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= Upload =================
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (!loggedInUser?.id) {
      router.replace("/logout");
      return;
    }

    if (files.length === 0) {
      toast.error("Select file first");
      return;
    }

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", loggedInUser.id);

      await uploadKycDoc("upload", formData, "POST");
    }

    toast.success("Uploaded successfully");
    setFiles([]);

    const data = await fetchKycDocs(loggedInUser.id);
    setKycData(data || []);
  }

  // ================= Update =================
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!kycDoc || files.length === 0) {
      toast.error("Select file first");
      return;
    }

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("user_id", loggedInUser.id);
    formData.append("kyc_id", kycDoc.id.toString());

    await uploadKycDoc("update", formData, "PATCH");

    toast.success("Replaced successfully");
    setFiles([]);
    setKycDoc(null);

    const data = await fetchKycDocs(loggedInUser.id);
    setKycData(data || []);
  }

  const EditKycDoc = (doc: KycItem) => {
    setKycDoc(doc);
    setFiles([]);
  };

  // ================= UI =================
  return (
    <div className="min-h-screen w-full relative">
      <ToastContainer />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b bg-gradient-to-b from-[#003253]/95 to-black/95" />
      <div className="relative  z-10 flex flex-col px-[20px] ">
        <div className="max-w-175 w-full mt-[145px]  mx-auto md:p-10 p-6 rounded-sm bg-black">
          {/* FORM */}
          <div className="   w-full mb-12  ">
            <h2 className="text-white text-xl font-semibold mb-6">
              {kycDoc ? "Replace" : "Submit"} KYC Detail
            </h2>

            <form onSubmit={kycDoc ? handleUpdate : handleSave}>
              {/* Drag Area */}
              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                htmlFor="fileUpload"
                className=" cursor-pointer border-2 block border-dashed border-autoblue bg-brandBlack p-8 text-center rounded mb-4"
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 text-2xl transition
                        group-hover:bg-blue-100 group-hover:scale-105"
                >
                  <HiOutlineUpload />
                </div>
                <p className="text-white text-base font-semibold mt-3 mb-2">Click to upload files</p>

                <input
                  type="file"
                  multiple={!kycDoc}
                  accept="image/jpeg, application/pdf"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                  id="fileUpload"
                />
              </label>

              {/* Upload Preview */}
              {files.length > 0 && (
                <div className="space-y-3 mb-4">
                  {files.map((file, index) => {
                    const preview = URL.createObjectURL(file);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-[#011827] p-3 rounded"
                      >
                        {file.type === "image/jpeg" ? (
                          <img
                            src={preview}
                            className="h-16 w-16 object-cover rounded"
                          />
                        ) : (
                          <div className="h-16 w-16 flex items-center justify-center bg-gray-700 text-white text-xs rounded">
                            PDF
                          </div>
                        )}

                        <span className="text-white text-sm flex-1 truncate">
                          {file.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-400 text-sm cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <button className="bg-autoblue w-full py-3 text-white font-semibold rounded">
                {kycDoc ? "Replace Document" : "Upload Document"}
              </button>
            </form>
          </div>

          {/* OLD TABLE DESIGN */}
          <div className="max-w-5xl mx-auto w-full overflow-x-auto">
            <table className="w-full bg-brandBlack text-white">
              <thead>
                <tr>
                  <th className="bg-autoblue p-3 text-center text-xs font-bold">
                    Preview
                  </th>
                  <th className="bg-autoblue p-3 text-center text-xs font-bold">
                    Attachment Name
                  </th>
                  <th className="bg-autoblue p-3 text-center text-xs font-bold">
                    Status
                  </th>
                  <th className="bg-autoblue p-3 text-center text-xs font-bold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {kycData.map((item) => (
                  <tr key={item.id} className="border-b border-[#2C364A]">
                    <td className="text-center p-3">
                      {item.attachment_url?.endsWith(".jpg") ? (
                        <img
                          src={item.attachment_url}
                          className="h-14 w-14 object-cover rounded mx-auto"
                        />
                      ) : (
                        <div className="h-14 w-14 bg-gray-700 text-white text-xs flex items-center justify-center rounded mx-auto">
                          PDF
                        </div>
                      )}
                    </td>

                    <td className="text-center text-xs p-3">
                      {item.attachment_name}
                    </td>

                    <td
                      className={`text-center text-xs p-3 font-semibold ${
                        item.status === "pending"
                          ? "text-yellow-400"
                          : "text-green-500"
                      }`}
                    >
                      {item.status}
                    </td>

                    <td className="text-center p-3">
                      <button
                        onClick={() => EditKycDoc(item)}
                        className="h-[30px] w-[30px] bg-[#011827] border border-[#153C51] flex items-center justify-center rounded-sm text-autoblue"
                      >
                        <PencilSquareIcon className="h-[18px] w-[18px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
