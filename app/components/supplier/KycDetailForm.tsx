"use client";

import { fetchKycDocs, imagePath, uploadKycDoc } from "@/app/utils/api";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineUpload } from "react-icons/hi";
import Image from "next/image";

interface KycItem {
  id: number;
  attachment_name: string;
  attachment_url?: string;
  status: string;
}

export default function KycDetailForm() {
  const [kycData, setKycData] = useState<KycItem[]>([]);
  const [isproccess, setisproccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];

  // ================= Fetch KYC =================
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

  // ================= Handle File (Only ONE) =================
  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const selectedFile = selectedFiles[0]; // ✅ only first file

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error(`${selectedFile.name} not allowed`);
      return;
    }

    setFile(selectedFile); // ✅ single file state
  };



  const handleDrop = (e: React.DragEvent<HTMLElement>) => {

    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };



  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {

    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
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

    if (!file) {
      toast.error("Select file first");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }


    if (isproccess) return;
    setisproccess(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", loggedInUser.id);

    await uploadKycDoc("upload", formData, "POST");

    toast.success("Uploaded successfully");
    setFile(null);


    const data = await fetchKycDocs(loggedInUser.id);
    setKycData(data || []);
    setisproccess(false);
  }

  // ================= UI =================
  return (
    <div className="min-h-screen w-full relative">


      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" />

      <div className="relative z-10 flex flex-col px-[20px]">
        <div className="max-w-175 w-full mt-[145px] mx-auto md:p-10 p-6 rounded-sm bg-black">

          {/* ================= FORM ================= */}
          <div className="w-full mb-12">
            <h2 className="text-white text-xl font-semibold mb-6">
              Submit KYC Detail
            </h2>

            <form onSubmit={handleSave}>
              {/* Drag Area */}
              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                htmlFor="fileUpload"
                className="cursor-pointer border-2 block border-dashed border-autoblue bg-brandBlack p-8 text-center rounded mb-4"
              >
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 text-2xl">
                  <HiOutlineUpload />
                </div>

                <p className="text-white text-base font-semibold mt-3 mb-2">
                  Click or Drag to upload file
                </p>

                <input
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                  id="fileUpload"
                />
              </label>

              {/* Preview */}
              {file && (
                <div className="mb-4">
                  <div className="flex items-center gap-4 bg-[#011827] p-3 rounded">
                    {file.type === "image/jpeg" ||
                      file.type === "image/png" ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview-doc"
                        width={80}
                        height={80}
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
                      onClick={removeFile}
                      className="text-red-400 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}

              <button className="cursor-pointer flex justify-center bg-autoblue w-full py-3 text-white font-semibold rounded">
                {isproccess && (<div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-white rounded-full animate-spin me-2"></div>)}
                Upload Document
              </button>
            </form>
          </div>

          {/* ================= TABLE ================= */}
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
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {kycData.map((item) => (
                  <tr key={item.id} className="border-b border-[#2C364A]">
                    <td className="text-center p-3">
                      {item.attachment_name?.endsWith("jpg") ||
                        item.attachment_name?.endsWith("png") ? (
                        <Image
                          src={imagePath + item.attachment_name}
                          width={80}
                          height={80}
                          alt="preview"
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
                      className={`capitalize text-center text-xs p-3 font-semibold ${item.status === "pending"
                          ? "text-yellow-400"
                          : item.status === "approved"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                    >
                      {item.status}
                    </td>
                    <td className="text-center p-3">
                      <a
                        href={imagePath + item.attachment_name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-[30px] w-[30px] bg-[#011827] border border-[#153C51] flex items-center justify-center rounded-sm text-autoblue mx-auto"
                      >
                        <EyeIcon className="h-[18px] w-[18px]" />
                      </a>
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