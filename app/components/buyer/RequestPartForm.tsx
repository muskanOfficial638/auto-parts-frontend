/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  buyerPath,
  fetchPartRequestsById,
  viewVehicleMake,
} from "@/app/utils/api";
import { toast } from "react-toastify";
import { Make, Model, PartRequest, Trim } from "../common/interface";
import { useRouter, useSearchParams } from "next/navigation";

export default function RequestPartForm() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("request") || "";
  const router = useRouter();
  const [formData, setFormData] = useState<PartRequest>();
  const [makeData, setMakeData] = useState<Make[]>([]);
  const [modelData, setModelData] = useState<Model[]>([]);
  const [trimData, setTrimData] = useState<Trim[]>([]);
  const [selectedMake, setSelectedMake] = useState<Make>();
  const [selectedModel, setSelectedModel] = useState<Model>();
  const [selectedTrim, setSelectedTrim] = useState<Trim>();

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
    // console.log("selected Make", selectedMake);

    if (selectedMake) {
      setSelectedMake(selectedMake);
      setModelData(selectedMake?.models);
      // console.log("modelData", selectedMake?.models);
      // const selectedModel = selectedModel?.models.find(
      //   (model: Model) => model.id
      // );
      // setSelectedModel(selectedModel);
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
      console.log("selectedTrimData", selectedTrimData);
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

    const multipartData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        multipartData.append(key, value as any);
      }
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
          <div className="w-[1037px] max-w-[100%] bg-brandBlack rounded-sm px-[30px] pt-[20px] pb-[60px]">
            <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
              <h2 className="md:text-[23px] text-text-lg leading-[36px] font-semibold text-white mb-[27px]">
                {requestId ? "Edit Part request" : "Request a Part"}
              </h2>

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
                    className="w-full py-[8px] px-[18px]  bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray placeholder-Gray  outline-none"
                  />
                </div>

                {/* Make */}
                <div>
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Make*
                  </label>
                  <select
                    onChange={(e) => handleSelectMakeChange(e.target.value)}
                    name="vehicle_make"
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
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
                <div>
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Model*
                  </label>
                  <select
                    name="vehicle_model"
                    onChange={(e) => handleSelectModelChange(e.target.value)}
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
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

                {/* Trim */}
                <div>
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Trim*
                  </label>
                  <select
                    name="vehicle_model"
                    onChange={(e) => handleSelectTrimChange(e.target.value)}
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
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
                <div>
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Urgency*
                  </label>
                  <select
                    name="urgency"
                    value={formData?.urgency || ""}
                    onChange={handleChange}
                    className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px] border border-LightNeutral rounded-sm text-Gray outline-none"
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
                      className="w-full py-[8px] px-[18px] bg-white md:text-[19px] text-[15px] leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                    />
                    {/* <CalendarDays
                      className="absolute right-5 top-4 text-gray-400"
                      size={18}
                    /> */}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                  <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                    Image*
                  </label>
                  <div className="flex flex-row items-center">
                    <input
                      type="file"
                      name="attachment"
                      accept="image/*"
                      onChange={handleChange}
                      placeholder="Browse Image"
                      className="px-[15px] py-[7px] placeholder-Gray font-sm leading-[29px] w-[111px] rounded-sm border border-autoblue text-autoblue hover:border-hoverblue duration-400 cursor-pointer cursor-pointer"
                    />
                    <span className="justify-center break-all p-4">
                      {formData?.attachment instanceof File
                        ? formData.attachment.name
                        : formData?.attachment ?? "No file selected"}
                    </span>
                  </div>
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
        </div>
      </div>
    </div>
  );
}
