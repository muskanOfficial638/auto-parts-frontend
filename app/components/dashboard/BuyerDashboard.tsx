"use client";

import Link from "next/link";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { fetchAllBuyerPartRequests } from "@/app/utils/api";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";

interface PartRequest {
  id: string;
  title: string;
  urgency: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_model_trim: string;
  required_by_date: string;
  attachment: string;
  status: number;
}

export default function BuyerDashboard() {
  const [partRequestData, setPartRequestData] = useState<PartRequest[]>();
  const [loading, setIsLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");

      if (loggedInUser?.access_token) {
        fetchAllBuyerPartRequests(
          loggedInUser?.user?.id,
          loggedInUser.access_token
        ).then((data) => {
          setPartRequestData(data);
          setIsLoading(false);
        });
      }
    }
  }, []);

  useEffect(() => { }, [partRequestData]);

  function handleClick(item: PartRequest) {
    router.push(`/view-part-request?request=${item.id}`);
  }


  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
      {/* Page Content */}
      <div className="relative z-10 flex justify-center pb-20 px-4">
        <div className="w-full max-w-[1037px] md:w-[992px] overflow-auto  py-[30px]">
          {/* Search Bar */}
          <div className="flex justify-center md:my-8 md:pt-[5rem] mb-[20px]">
            <div className="relative w-full max-w-[583px]">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white text-sm text-[#848484] placeholder-[#848484] leading-[17px] rounded-sm py-[10px] px-[15px] border border-[#1f2d3a] focus:outline-none"
              />
              <div className="bg-autoblue text-white absolute right-0 flex  rounded-r-sm items-center h-full top-0 py-[10px] px-[13px]">
                <MagnifyingGlassIcon className="h-[14px] w-[14px]" />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#12151B]  rounded-sm">
            {/* Header */}
            {/* <div className="grid grid-cols-8 bg-autoblue text-white font-semibold px-[70px] py-[9px] font-bold leading-[22px] text-sm">
              <p>Product</p>
              <p>Make</p>
              <p>Model</p>
              <p>Trim</p>
              <p>Urgency</p>
              <p>Required</p>
              <p>Status</p>
              <p className="text-center">Action</p>
            </div> */}

            {/* Rows */}
            <div className="divide-y divide-[#2C364A]">
              <div
                className="grid bg-autoblue grid-cols-9 items-center p-[9px] rounded-tr-sm rounded-tl-sm  leading-[22px] font-bold text-[13px] text-white"
              >
                <p className=" col-span-2 text-center">Product</p>
                <p className=" text-center">Make</p>
                <p className=" text-center">Model</p>
                <p className=" text-center">Trim</p>
                <p className=" text-center">Urgency</p>
                <p className=" text-center">Required</p>
                <p className=" text-center">Status</p>
                <p className=" text-center">Action</p>

              </div>

              {partRequestData ? (
                partRequestData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-9 items-center mx-[20px] py-[10px] text-white"
                  >
                    {/* Product */}
                    <div className="flex items-center  col-span-2 gap-[15px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <div className="bg-white py-[6px] px-[11px] rounded-sm">
                        <img
                          src="/productImage.png"
                          alt="product"
                          className="w-[28px] h-[39px] "
                        />
                      </div>
                      <span className="text-xs font-semibold leading-[22px]">{item.title}</span>
                    </div>

                    <p className=" text-xs leading-[22px] font-semibold text-center">{item.vehicle_make}</p>
                    <p className=" text-xs leading-[22px] font-semibold text-center">{item.vehicle_model}</p>
                    <p className=" text-xs leading-[22px] font-semibold text-center">{item.vehicle_model_trim}</p>

                    {/* Urgency Badge */}
                    <span className="text-xs capitalize ms-[auto] me-[auto] font-medium leading-[15px] text-center text-white bg-[#52A84E] px-[9px] py-[2px] rounded-[50px] w-[46px]">
                      {item.urgency}
                    </span>

                    <p className="text-xs leading-[22px] font-semibold text-center">{item.required_by_date}</p>

                    {/* Status Color */}
                    <p
                      className={`text-xs leading-[22px] font-semibold text-center ${item.status === 0
                        ? "text-yellow-400"
                        : item.status === 1
                          ? "text-green-500"
                          : "text-red-500"
                        }`}
                    >
                      {item.status === 0
                        ? "Incative"
                        : item.status === 1
                          ? "Active"
                          : "Suspend"}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 justify-center">
                      {/* <Link
                        href={`/view-part-request?request=${item.id}`}
                        className="p-2 rounded border border-autoblue text-autoblue hover:bg-blue-500/20 cursor-pointer"
                      >
                        <EyeIcon className="h-5" />
                      </Link> */}
                      <button
                        onClick={() => handleClick(item)}
                        className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                      >
                        <EyeIcon className="h-[20px] w-[20px]" />
                      </button>
                      <Link
                        href="/request-part"
                        className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                      >
                        <PencilSquareIcon className="h-[20px] w-[20px]" />
                      </Link>
                      <button className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer">
                        <TrashIcon className="h-[20px] w-[20px]" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-gray-900">No Users found.</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
