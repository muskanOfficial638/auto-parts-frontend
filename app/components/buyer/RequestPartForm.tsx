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
import { TrashIcon } from "@heroicons/react/24/outline";
import AddNewAddress from "./AddNewAddress";
import DeleteAddressModal from "./modal/DeleteAddressModal";
import { fetchBuyerAddress } from "@/app/utils/api";
import { IoIosAddCircle } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

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
  };

  interface AddressType {
    address: string;
    name: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    id?: string;
  }
  interface AddressTypeWithID {
    address: string;
    name: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    id: string;
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
  const [deleAddressID, setDeleAddressID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [changeaddress, setChangeaddress] = useState("");
  const [selectedAddressData, setSelectedAddressData] = useState<AddressType | null>(null);
  const [address, setAddress] = useState<AddressTypeWithID[]>();
  const [formStep, setFormStep] = useState<number>(1);
  const [inproccess, setinproccess] = useState<boolean>(false);



  function selectAddrsss() {
    const selectedAddress = (
      document.querySelector(
        'input[name="address"]:checked',
      ) as HTMLInputElement
    )?.value;

    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    setFormStep(2);
    setSelectedAddressData(address?.filter((addr) => addr.id === selectedAddress)[0] || null);


  }


  useEffect(() => {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (loggedInUser.id) {
      fetchBuyerAddress(loggedInUser.id).then(
        (data) => {
          const reversed = [...(data?.data || [])].reverse();
          setAddress(reversed);
        },
      );
    }else{
      router.replace("/logout");
    }
  }, [changeaddress,router]);


  useEffect(() => {
  
    if (requestId) {
      fetchPartRequestsById(requestId).then(
        (data: PartRequest) => {
          // console.log("data",data);
          setFormData(data);
        },
      );
    }
    const fetchData = async () => {
      const makeData = await viewVehicleMake();
      setMakeData(makeData);
    };
    fetchData();
  }, [requestId]);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>,
  ) => {
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
    const selectedMake = vehicleMakeData.find(
      (make: Make) => make.make_id === selectedId,
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
    const selectedModelData = vehicleModelData.find(
      (model: Model) => model?.id === selectedId,
    );
    if (selectedModelData) {
      setSelectedModel(selectedModelData);
      setTrimData(selectedModelData?.trims);
    } else {
      console.warn("Model not found for ID:", selectedId);
    }
  };

  const handleSelectTrimChange = async (trimId: string) => {
    const selectedId = trimId;
    const vehicleModelData = trimData;
    // Find the corresponding make name from your makes array
    const selectedTrimData = vehicleModelData.find(
      (trim: Trim) => trim?.id === selectedId,
    );

    if (selectedTrimData) {
      setSelectedTrim(selectedTrimData);
    } else {
      console.warn("Trim not found for ID:", selectedId);
    }
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
     if(inproccess) return;
     setinproccess(true)
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    delete selectedAddressData?.id;
    const addressjson = JSON.stringify(selectedAddressData);
    const updatedData: any = {
      ...formData,
      user_id: loggedInUser?.id || "",
      vehicle_make: formData?.vehicle_make
        ? formData?.vehicle_make
        : selectedMake?.make_name || "",
      vehicle_model: formData?.vehicle_model
        ? formData?.vehicle_model
        : selectedModel?.name || "",
      vehicle_model_trim: formData?.vehicle_model_trim
        ? formData?.vehicle_model_trim
        : selectedTrim?.trim || "",
      address: addressjson,
    };

    if (
      !updatedData.title ||
      !updatedData.urgency ||
      !updatedData.vehicle_make ||
      !updatedData.vehicle_model ||
      !updatedData.vehicle_model_trim ||
      !updatedData.required_by_date
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    if (updatedData.attachment.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    if(files.length >5  ){
       toast.error("Please upload up to 5 images only");
      return;
    }

    const multipartData = new FormData();
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
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        toast.error(errorData?.detail || "Failed to save part request");
        return;
      }


      toast.success(
        requestId ? "Part request updated" : "Part request created",
      );
     
      router.push("/buyer-dashboard");
      setinproccess(false)
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Network error or server not responding");
    }
  }

  const [files, setFiles] = useState<File[]>([]);



const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files ?? []) as File[];

   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
const maxSize = 5 * 1024 * 1024; 

const validFiles = selectedFiles.filter((file) => {
  if (!allowedTypes.includes(file.type)) {
    toast.error(`Please upload a valid image file (JPG, JPEG, PNG).`);
    return false;
  }
  if (file.size > maxSize) {
    toast.error(`${file.name} must be less than 5MB`);
    return false;
  }
  return true;
});

  if (validFiles.length === 0) return;

  setFiles((prev: File[]) => [...prev, ...validFiles]);

  setFormData((prev) => ({
    ...prev,
    attachment: [...(prev.attachment || []), ...validFiles],
  }));
};

  
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      attachment: prev.attachment?.filter((_, i) => i !== index),
    }));
  };

  function deleteHandeler(addressId: string) {
    setDeleAddressID(addressId);
    setModalOpen(true);
  }
  const [isOpenAddAddress, setisOpenAddAddress] = useState(false);
  function handleAddressModalClose() {
    setisOpenAddAddress(true);
  }

  return (
    <>
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
                {requestId ? (
                  <button
                    onClick={() => history.back()}
                    className=" bg-white cursor-pointer h-8 w-8 rounded-full flex justify-center items-center text-black "
                  >
                    <FaArrowLeft />
                  </button>
                ) : (
                  ""
                )}
              </div>
              <form className="space-y-[28px]" onSubmit={handleSave}>
                {/* Product Name */}
                {formStep === 1 ? (
                  <div>
                    <div className="flex justify-between items-center mb-[27px]">
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Select Delivery Address
                      </label>
                      <button
                        title="Add Address"
                        type="button"
                        onClick={() => handleAddressModalClose()}
                      >
                        <IoIosAddCircle className="cursor-pointer h-10 w-10" />
                      </button>
                    </div>
                    <div className="space-y-[25px]">
                      {!address ? (
                        <div className="flex justify-center items-center h-24">
                          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : address.length === 0 ? (
                        <p className="text-white text-center py-10">
                          No address found, please add your address
                        </p>
                      ) : (
                        address.map((data, index) => (
                          <label
                            key={index}
                            className="flex items-start gap-[10px] p-[10px] rounded-sm border border-[#153C51] bg-[#011827] cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="address"
                              value={data.id}
                              defaultChecked={index === 0}
                              className="mt-1 h-[16px] w-[16px] autoblue"
                            />
                            <div>
                              <p className="text-white font-semibold leading-[16px] text-[13px]">
                                {data?.name}:
                              </p>
                              <p className="mt-[5px] text-white text-xs">
                                {data?.address}, {data?.city}, {data?.province},{" "}
                                {data?.postal_code}, {data?.country}
                              </p>
                            </div>
                            <div
                              className="ml-auto my-auto"
                              onClick={() => deleteHandeler(data?.id)}
                            >
                              {" "}
                              <TrashIcon className="h-[20px] w-[20px] text-red-500" />
                            </div>
                          </label>
                        ))
                      )}
                    </div>

                    <div className="flex justify-end mt-[20px]">
                      {address && address.length > 0 ? (
                        <button
                          onClick={selectAddrsss}
                          type="button"
                          className="bg-autoblue md:text-[22px] text-base leading[14px] w-50 rounded-sm text-white md:py-[12px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="bg-gray-500 md:text-[22px] text-base leading[14px] w-50 rounded-sm text-white md:py-[12px] p-[13px] font-semibold cursor-not-allowed"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
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
                          onChange={(e) =>
                            handleSelectMakeChange(e.target.value)
                          }
                          name="vehicle_make"
                          className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[29px]  border border-LightNeutral rounded-sm text-Gray outline-none"
                        >
                          <option
                            value={requestId ? formData?.vehicle_make : ""}
                          >
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
                          onChange={(e) =>
                            handleSelectModelChange(e.target.value)
                          }
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
                          onChange={(e) =>
                            handleSelectTrimChange(e.target.value)
                          }
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
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full py-[8px] px-[18px] bg-white md:text-base text-sm   border border-LightNeutral rounded-sm text-Gray outline-none"
                        />
                        {/* <CalendarDays
                      className="absolute right-5 top-4 text-gray-400"
                      size={18}
                    /> */}
                      </div>
                    </div>
                    {/* discription */}
                    <div>
                      <label className="text-Gray md:text-[13px] text-xs font-bold leading-[13px] uppercase block mb-[14px]">
                        Description
                      </label>

                      <div className="relative">
                        <textarea
                          name="description"
                          onChange={handleChange}
                          value={formData?.description || ""}
                          className="h-32 w-full py-[8px] px-[18px] bg-white md:text-base text-sm leading-[20px]  border border-LightNeutral rounded-sm text-Gray outline-none"
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
                      {files.length < 5 && (
                      <div className="flex flex-row items-center">
                        <input
                          type="file"
                          name="attachment"
                          accept=".jpg,.jpeg,.png"
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
                                <span className="text-sm text-gray-800 font-medium">
                                  {file.name}
                                </span>
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
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="flex items-center justify-center gap-2 bg-gray-500 md:text-base text-sm leading[14px] w-50 rounded-sm text-white md:py-[10px] p-[13px] font-semibold hover:bg-gray-600 duration-400 cursor-pointer"
                      >
                        <IoArrowBack /> Back
                      </button>
                      <button
                        type="submit"
                        className="bg-autoblue md:text-base text-sm leading[14px] w-50 rounded-sm text-white md:py-[10px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                      >
                        {requestId ? "Update Request" : "Submit Request"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {isOpenAddAddress && (
        <AddNewAddress
          closeModal={setisOpenAddAddress}
          Changeaddress={setChangeaddress}
        />
      )}
      <DeleteAddressModal
        open={modalOpen}
        addressId={deleAddressID}
        onClose={setModalOpen}
        onDeleted={setChangeaddress}
      />
    </>
  );
}
