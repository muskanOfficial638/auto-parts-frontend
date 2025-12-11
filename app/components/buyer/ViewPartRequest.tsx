/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import {
  fetchPartRequestsById,
  getQuoteByRequest,
  updateQuoteByAction,
} from "@/app/utils/api";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { PartRequest, Quote } from "../common/interface";

export default function ViewPartRequest() {
  const searchParams = useSearchParams();
  const request = searchParams.get("request") || "";
  const [partRequest, setPartRequest] = useState<PartRequest>();
  const [quoteData, setQuoteData] = useState<Quote[]>();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");

    if (loggedInUser?.access_token && request) {
      fetchPartRequestsById(request, loggedInUser.access_token).then((data) => {
        setPartRequest(data);
        setIsLoading(false);
      });

      getQuoteByRequest(request, loggedInUser.access_token).then((data) => {
        setQuoteData(data);
      });
    }
  }, [request]);

  useEffect(() => {
    // console.log("quoteData:", quoteData);
  }, [partRequest, quoteData]);

  async function handleActionChange(
    quoteId: string,
    requestId: string,
    tab: string
  ) {
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    try {
      const response = await updateQuoteByAction(
        quoteId,
        requestId,
        tab,
        loggedInUser?.access_token
      );
      // console.log("update:", response);

      if (response?.status === 200) {
        toast("Action updated successfully");
        setTimeout(() => {
          // Call the callback function from the parent
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      // Handle errors more gracefully
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server error:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response:", err.request);
      } else {
        // Something else happened
        console.error("Error:", err.message);
      }
    }
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
      <ToastContainer />

      {/* Page Content */}
      <div className="relative z-10 flex justify-center pt-36 pb-20 px-4">
        <div className="w-full max-w-[1037px] bg-[#12151B] rounded-sm shadow-lg p-[20px]">
          {/* Header (Image + Title + Button) */}
          <div className="flex justify-between flex-wrap gap-y-[20px] items-center">
            <div className="flex items-start gap-[15px]">
              <div className="bg-white md:py-[10px] md:px-[24px] py-[5px] px-[10px] rounded-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/productImage.png"
                  alt="Filter"
                  width={120}
                  height={120}
                  className="object-cover md:w-[71px] md:h-[99px] w-[36px] h-[50px]"
                />
              </div>

              <div className="flex flex-col justify-start">
                <h1 className="md:text-[26px] text-lg text-white font-bold leading-[22px] flex gap-2 items-center">
                  {partRequest?.title}
                  <span className="text-[8px] font-medium capitalize leading-[10px] text-white bg-[#52A84E] px-[9px] py-[1px] rounded-[50px]">
                    {partRequest?.urgency}
                  </span>
                </h1>

                <p className="md:text-sm text-xs leading-[22px] font-medium text-white mt-[5px]">
                  {partRequest?.description}
                </p>

                <p className="md:text-xs text-[10px] leading-[15px] font-medium text-[#A4A4A4] md:mt-[15px] mt-[5px]">
                  {partRequest?.vehicle_make} {partRequest?.vehicle_model} •{" "}
                  {partRequest?.vehicle_model_trim}
                </p>
                <p className="text-[10px] leading-[22px] font-medium text-[#F8F8F8] mt-[5px]">
                  Required By:{" "}
                  <span className="font-bold">
                    {partRequest?.required_by_date}
                  </span>
                </p>
              </div>
            </div>

            <button className="text-autoblue md:w-[auto] w-full cursor-pointer md:text-base text-sm leading-[14px] border border-autoblue py-[13px] px-[20px] duration-400 hover:text-white rounded-sm hover:bg-hoverblue hover:border-hoverblue">             
                Mark as Completed             
            </button>
          </div>

          {/* QUOTES LIST */}
          <div className="space-y-[10px] mt-[16px]">
            {quoteData?.length &&
              quoteData?.map((data: Quote) => (
                <div
                  key={data.id}
                  className="bg-[#011827] border border-[#153C51] rounded-sm pt-[5px] pb-[15px] ps-[12px] pe-[22px]"
                >
                  <div className="flex justify-between flex-wrap gap-y-[20px] items-center">
                    <div>
                      <p className="text-white md:text-sm text-xs font-bold leading-[22px]">
                        @{data?.user?.user_name}
                      </p>
                      <p className="leading-[22px] md:text-xs text-[10px]">
                        {data?.user?.email}
                      </p>

                      <p className="text-[#A4A4A4] mt-[5px] text-xs  leading-[15px]">
                        <span className="font-semibold text-[#A4A4A4]">
                          Price:
                        </span>{" "}
                        <span className="text-[10px] medium leading-[22px] text-autoblue">
                          {data?.price_cents}
                        </span>
                      </p>

                      <p className="text-[#A4A4A4] medium mt-[5px] text-xs leading-[15px]">
                        <span className="font-bold text-[#A4A4A4]">
                          Delivery Days:
                        </span>{" "}
                        {data?.eta_days}
                      </p>

                      <p className="text-[#A4A4A4] medium mt-[5px] text-xs leading-[15px]">
                        <span className="font-bold text-[#A4A4A4]">
                          Description:
                        </span>{" "}
                        {data?.terms}
                      </p>
                    </div>

                    {/* Right-Side Buttons  */}
                    <div className="flex items-center gap-3">
                      {data?.status == "accepted" && (
                        <div className="bg-autoblue hover:bg-hoverblue duration-400 cursor-pointer md:text-base text-xs leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm">
                          Accepted
                        </div>
                      )}
                      {data?.status == "rejected" && (
                        <button disabled className="bg-red-600 duration-400 md:text-base text-xs leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm">
                          Rejected
                        </button>
                      )}
                       {data?.status == "pending" && (
                        <>
                          <button
                            className="bg-green-600 md:text-base text-xs duration-400 leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm hover:bg-green-700 cursor-pointer"
                            onClick={() =>
                              handleActionChange(
                                data?.id,
                                data?.request_id,
                                "accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-600 px-5 py-2 md:text-base text-xs duration-400 leading-[14px] md:px-[38px] md:py-[13px] px-[28px] py-[8px] text-white rounded-sm hover:bg-red-700 cursor-pointer"
                            onClick={() =>
                              handleActionChange(
                                data?.id,
                                data?.request_id,
                                "rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
