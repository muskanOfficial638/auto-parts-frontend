/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  buyerPath,
  fetchPartRequestsById,
  viewVehicleMake,
} from "@/app/utils/api";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Make, Model, PartRequest, Trim } from "../common/interface";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { HiOutlineUpload } from "react-icons/hi";

export default function RequestPartForm() {
  const initialFormData: PartRequest = {

    title: "",
    urgency: "",
    user_id: "",
    vehicle_make: "",
    vehicle_model: "",
    vehicle_model_trim: "",
    required_by_date: "",
    attachment: [],
    status: 1,
    description: "",
  }
  const searchParams = useSearchParams();
  const requestId = searchParams.get("request") || "";
  const router = useRouter();
  const [formData, setFormData] = useState<PartRequest>(initialFormData);
  const [makeData, setMakeData] = useState<Make[]>([]);
  const [modelData, setModelData] = useState<Model[]>([]);
  const [trimData, setTrimData] = useState<Trim[]>([]);
  const [selectedMake, setSelectedMake] = useState<Make>();
  const [selectedModel, setSelectedModel] = useState<Model>();
  const [selectedTrim, setSelectedTrim] = useState<Trim>();


  useEffect(() => {

    console.log("dd :", formData);
  }, [formData]);
  useEffect(() => {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (loggedInUser?.access_token && requestId) {
      fetchPartRequestsById(requestId, loggedInUser.access_token).then(
        (data: PartRequest) => {
          // console.log("data",data);
          setFormData(data);
        }
      );
    }
    const fetchData = async () => {
      const makeData = await viewVehicleMake();
      setMakeData(makeData);
    };
    fetchData();
  }, [requestId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    const { name, type, files, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };

  const handleSelectMakeChange = async (makeId: string) => {
    console.log("make id", makeId);
    const selectedId = makeId;
    const vehicleMakeData = await viewVehicleMake();
    // Find the corresponding make name from your makes array
    const selectedMake = vehicleMakeData.find(
      (make: Make) => make.make_id === selectedId
    );


    if (selectedMake) {
      setSelectedMake(selectedMake);
      setModelData(selectedMake?.models);

    } else {
      console.warn("Make not found for ID:", selectedId);
    }
  };

  const handleSelectModelChange = async (modelId: string) => {
    const selectedId = modelId;
    const vehicleModelData = modelData;
    // Find the corresponding make name from your makes array
    const selectedModelData = vehicleModelData.find(
      (model: Model) => model?.id === selectedId
    );

    if (selectedModelData) {
      setSelectedModel(selectedModelData);
      setTrimData(selectedModelData?.trims);
      // console.log("Trim data", selectedModelData?.trims);
    } else {
      console.warn("Model not found for ID:", selectedId);
    }
  };

  const handleSelectTrimChange = async (trimId: string) => {
    const selectedId = trimId;
    const vehicleModelData = trimData;
    // Find the corresponding make name from your makes array
    const selectedTrimData = vehicleModelData.find(
      (trim: Trim) => trim?.id === selectedId
    );

    if (selectedTrimData) {
      setSelectedTrim(selectedTrimData);

    } else {
      console.warn("Trim not found for ID:", selectedId);
    }
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    const updatedData: any = {
      ...formData,
      user_id: loggedInUser?.user?.id || "",
      vehicle_make: formData?.vehicle_make
        ? formData?.vehicle_make
        : selectedMake?.make_name || "",
      vehicle_model: formData?.vehicle_model
        ? formData?.vehicle_model
        : selectedModel?.name || "",
      vehicle_model_trim: formData?.vehicle_model_trim
        ? formData?.vehicle_model_trim
        : selectedTrim?.trim || "",
    };
    if (!updatedData.title || !updatedData.urgency || !updatedData.vehicle_make || !updatedData.vehicle_model || !updatedData.vehicle_model_trim || !updatedData.required_by_date) {
      toast.error("Please fill all required fields");
      return;
    }
    if (updatedData.attachment.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const multipartData = new FormData()
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "attachment" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            multipartData.append("attachment", file);
          }
        });
        return;
      }
      multipartData.append(key, String(value));
    });

    try {
      const url = requestId
        ? `${buyerPath}/part-request/${requestId}`
        : `${buyerPath}/part-request`;

      const method = requestId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        body: multipartData,
        headers: {
          // Add Authorization if your API requires it
          ...(loggedInUser?.access_token && {
            Authorization: `Bearer ${loggedInUser.access_token}`,
          }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        toast.error(errorData?.detail || "Failed to save part request");
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
      toast.success(
        requestId ? "Part request updated" : "Part request created"
      );
      router.push("/buyer-dashboard");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Network error or server not responding");
    }
  }







  const [files, setFiles] = useState<File[]>([]);


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
  };


  return (
    <div className="min-h-screen w-full relative">
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
          <div className="w-[850px] max-w-[100%] bg-brandBlack rounded-sm p-[30px] ">
            <div className="flex items-center justify-between mb-[27px]">
              <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white ">
                {requestId ? "Edit Part request" : "Request a Part"}
              </h2>
              {requestId ? <button onClick={() => history.back()} className=" bg-white cursor-pointer h-8 w-8 rounded-full flex justify-center items-center text-black "><FaArrowLeft /></button> : ''}

            </div>
            <form className="space-y-[28px]" onSubmit={handleSave}>
              {/* Product Name */}
              <div>
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Product Name*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData?.title || ""}
                  onChange={handleChange}
                  className="w-full py-[8px] px-[18px]  bg-white md:text-base text-sm leading-[13px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                />
              </div>

              {/* Make */}
              <div className="flex justify-between items-center gap-[15px]">
                <div className="w-full">
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Make*
                  </label>
                  <select
                    onChange={(e) => handleSelectMakeChange(e.target.value)}
                    name="vehicle_make"
                    className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                  >
                    <option value={requestId ? formData?.vehicle_make : ""}>
                      {requestId ? formData?.vehicle_make : "Select Make"}
                    </option>
                    {makeData &&
                      makeData.map((make: Make) => (
                        <option key={make?.make_id} value={make?.make_id}>
                          {make?.make_name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Model */}
                <div className="w-full">
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Model*
                  </label>
                  <select
                    name="vehicle_model"
                    onChange={(e) => handleSelectModelChange(e.target.value)}
                    className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                  >
                    <option
                      value={
                        requestId && !selectedMake
                          ? formData?.vehicle_model
                          : ""
                      }
                    >
                      {requestId && !selectedMake
                        ? formData?.vehicle_model
                        : "Select Model"}
                    </option>
                    {modelData &&
                      modelData.map((model: Model) => (
                        <option key={model?.id} value={model?.id}>
                          {model?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center gap-[15px]">
              {/* Trim */}
              <div className="w-full">
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Trim*
                </label>
                <select
                  name="vehicle_model"
                  onChange={(e) => handleSelectTrimChange(e.target.value)}
                  className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                >
                  <option
                    value={
                      requestId && !selectedMake
                        ? formData?.vehicle_model_trim
                        : ""
                    }
                  >
                    {requestId && !selectedMake
                      ? formData?.vehicle_model_trim
                      : "Select Trim"}
                  </option>
                  {trimData &&
                    trimData.map((trim: Trim) => (
                      <option key={trim?.id} value={trim?.id}>
                        {trim?.trim}
                      </option>
                    ))}
                </select>
              </div>

              {/* Urgency */}
              <div className="w-full">
                <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                  Urgency*
                </label>
                <select
                  name="urgency"
                  value={formData?.urgency || ""}
                  onChange={handleChange}
                  className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[29px] border border-LightNeutral rounded-sm text-Gray outline-none"
                >
                  <option value="" disabled>
                    Select urgency
                  </option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>

                {/* <input
                    type="text"
                    name="urgency"
                    placeholder="Ex.- High, low, medium"
                    onChange={handleChange}
                    value={formData?.urgency || ""}
                    className="w-full py-[8px] px-[18px] placeholder-Gray bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                  /> */}
              </div>
          </div>

          {/* Required Date */}
          <div>
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Required
            </label>

            <div className="relative">
              <input
                type="date"
                name="required_by_date"
                onChange={handleChange}
                value={formData?.required_by_date}
                className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[13px]  border border-LightNeutral rounded-sm text-Gray outline-none"
              />
              {/* <CalendarDays
                      className="absolute right-5 top-4 text-gray-400"
                      size={18}
                    /> */}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-[10px]">
            <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
              Image*
            </label>
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
                className="group flex flex-col items-center justify-center w-full rounded-sm border-2 border-dashed border-gray-300 bg-gradient-to-br from-white to-gray-50 p-5 cursor-pointer transition
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
                    className="text-red-500 cursor-pointer text-sm font-semibold hover:text-red-600"
                  >
                    Remove ✖
                  </button>
                </li>
              );
            })}

          </div>



          {/* Save Button */}
          <button
            type="submit"
            className="bg-autoblue md:text-[22px] text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
          >
            {requestId ? "Update Request" : "Submit Request"}
          </button>
        </form>

      </div>
    </div>
      </div >
    </div >
  );
}
