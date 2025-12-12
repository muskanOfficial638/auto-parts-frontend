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
import { PartRequest } from "../common/interface";
import DeleteModal from "../buyer/modal/DeleteModal";

export default function BuyerDashboard() {
  const [partRequestData, setPartRequestData] = useState<PartRequest[]>();
  const [loading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestId, setRequestId] = useState("");
  const router = useRouter();

  const refreshRequests = async () => {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (loggedInUser?.access_token) {
      const data = await fetchAllBuyerPartRequests(
        loggedInUser?.user?.id,
        loggedInUser?.access_token
      );
      setPartRequestData(data);
      setIsLoading(false);
    }
  };

  // Load on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (!loggedInUser?.access_token) return;

      const data = await fetchAllBuyerPartRequests(
        loggedInUser.user?.id,
        loggedInUser.access_token
      );
      setPartRequestData(data);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const autoPartsUserData = localStorage.getItem("autoPartsUserData");
  //     const loggedInUser = JSON.parse(autoPartsUserData || "{}");
  //     if (loggedInUser?.access_token) {
  //       fetchAllBuyerPartRequests(
  //         loggedInUser?.user?.id,
  //         loggedInUser.access_token
  //       ).then((data) => {
  //         setPartRequestData(data);
  //         setIsLoading(false);
  //       });
  //     }
  //   }
  // }, []);

  useEffect(() => {}, [partRequestData]);

  function handleClick(item: PartRequest) {
    router.push(`/view-part-request?request=${item.id}`);
  }

  function ModalOpen(requestId: string) {
    setRequestId(requestId);
    setModalOpen(true);
  }

  if (loading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
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
        <div className="absolute inset-0 bg-gradient-to-b bg-[linear-gradient(to_bottom,rgba(0,50,83,0.95),rgba(0,0,0,0.95))]" />
        {/* Page Content */}
        <div className="relative z-10 flex justify-center pb-20 px-4">
          <div className="w-full max-w-[1037px]  py-[30px]">
            {/* Search Bar */}
            <div className="flex justify-center my-8 pt-[5rem]">
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
            <div className=" table-container overflow-auto">
              <table className="w-full border-0 bg-[#12151B] text-white  rounded-sm">
                <thead>
                  <tr>
                    <th className=" bg-autoblue rounded-tl-sm p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Product
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Make
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Model
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Trim
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Urgency
                    </th>
                    <th className=" bg-autoblue p-[9px] text-center leading-[22px] font-bold md:text-[13px] text-[11px]">
                      Required
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
                  {partRequestData ? (
                    partRequestData.map((item, index) => (
                      <tr
                        key={index}
                        className=" text-white border-b border-[#2C364A] "
                      >
                        {/* Product */}
                        <td className="flex p-[10px] items-center gap-[15px]">
                          <div className="bg-white w-[50px] h-[50px] flex items-center justify-center rounded-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/productImage.png"
                              alt="product"
                              className="md:w-[28px] md:h-[39px] w-[22px] h-[22px] "
                            />
                          </div>
                          <span className="md:text-xs text-[10px] font-semibold md:leading-[22px] leading-[13px]">
                            {item.title}
                          </span>
                        </td>

                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.vehicle_make}
                        </td>
                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.vehicle_model}
                        </td>
                        <td className=" p-[10px] md:text-xs text-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.vehicle_model_trim}
                        </td>

                        {/* Urgency Badge */}
                        <td className="p-[10px]">
                          <div className="text-[10px] capitalize font-medium leading-[15px] text-center text-white bg-[#52A84E] px-[9px] py-[2px] ms-auto me-auto w-[46px] rounded-[50px]">
                            {item.urgency}
                          </div>
                        </td>

                        <td className="md:text-xs text-[10px] p-[10px] md:leading-[22px] leading-[13px] font-semibold text-center">
                          {item.required_by_date}
                        </td>

                        {/* Status Color */}
                        <td
                          className={`md:text-xs text-[10px] md:leading-[22px] leading-[13px] p-[10px] font-semibold text-center ${
                            item.status === 0
                              ? "text-yellow-400"
                              : item.status === 1
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status === 0
                            ? "Inactive"
                            : item.status === 1
                            ? "Active"
                            : "Suspend"}
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="flex gap-3 p-[10px] justify-center">
                            <button
                              onClick={() => handleClick(item)}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                            >
                              <EyeIcon className="h-[20px] w-[20px]" />
                            </button>
                            <Link
                              href={`/request-part?request=${item?.id}`}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                            >
                              <PencilSquareIcon className="h-[20px] w-[20px]" />
                            </Link>
                            <button
                              onClick={() => ModalOpen(item?.id)}
                              className="px-[5px] flex justify-center items-center h-[30px] w-[30px] bg-[#011827] rounded-sm border border-[#153C51] text-autoblue cursor-pointer"
                            >
                              <TrashIcon className="h-[20px] w-[20px]" />
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

      <DeleteModal
        open={modalOpen}
        requestId={requestId}
        onClose={() => setModalOpen(false)}
        onDeleted={refreshRequests} // <-- notify parent
      />
    </>
  );
}
