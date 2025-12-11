"use client";

import BidModal from "@/app/components/supplier/Modal/BidModal";
import OTPModal from "@/app/components/supplier/Modal/OtpModal";
import { getQuoteBySupplier } from "@/app/utils/api";
import { useEffect, useState } from "react";
import { Quote } from "../common/interface";
// import Loader from "../common/Loader";

export default function MyBids() {
  const [activeTab, setActiveTab] = useState("pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<Quote[]>();
  //const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const autoPartsUserData = localStorage.getItem("autoPartsUserData");
      const loggedInUser = JSON.parse(autoPartsUserData || "{}");
      if (loggedInUser?.access_token) {
        getQuoteBySupplier(
          loggedInUser?.user?.id,
          "pending",
          1,
          10,
          loggedInUser.access_token
        ).then((data) => {
          setQuoteData(data?.quotes);
          // setIsLoading(false)
        });
      }
    }
  }, []);

  useEffect(() => {}, [quoteData]);

  function onTabClick(tabName: string) {
    setActiveTab(tabName);
    const autoPartsUserData = localStorage.getItem("autoPartsUserData");
    const loggedInUser = JSON.parse(autoPartsUserData || "{}");
    if (loggedInUser?.access_token) {
      getQuoteBySupplier(
        loggedInUser?.user?.id,
        tabName,
        1,
        10,
        loggedInUser.access_token
      )
        .then((data) => {
          setQuoteData(data?.quotes);
          // setIsLoading(false)
        })
        .catch(() => {
          setQuoteData([]);
        });
    }
  }

  //   if (loading) {
  //     return (
  //       <div className="h-screen">
  //         <Loader />
  //       </div>
  //     );
  //   }

  return (
    <>
      <div className="min-h-screen w-full relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />

        {/* Gradient Overlay */}
        <div className="absolute top-[0] bottom-[0] h-full w-full bg-[linear-gradient(to_bottom,rgba(0,50,83,0.95),rgba(0,0,0,0.95))]" />

        {/* Main Content */}
        <div className="relative z-10 flex justify-center pt-36 pb-20 px-4">
          {/* List Items */}
          <div className="space-y-[25px] w-full max-w-[1037px] rounded-lg shadow-lg ">
            <h2 className="text-2xl leading-[14px] font-bold text-center text-white">
              My bids
            </h2>
            <div className="text-xl items-center flex space-x-[36px]">
              <span
                className={`cursor-pointer font-medium text-xl leading-[14px] ${
                  activeTab === "pending"
                    ? "font-bold text-xl leading-[14px] text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("pending")}
              >
                Active
              </span>

              <span
                className={`cursor-pointer font-medium text-xl leading-[14px] ${
                  activeTab === "accepted"
                    ? "font-bold text-xl leading-[14px] text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("accepted")}
              >
                Accepted
              </span>

              <span
                className={`cursor-pointer font-medium text-xl leading-[14px] ${
                  activeTab === "cancelled"
                    ? "font-bold text-xl leading-[14px] text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("cancelled")}
              >
                Cancelled
              </span>

              <span
                className={`cursor-pointer font-medium text-xl leading-[14px] ${
                  activeTab === "completed"
                    ? "font-bold text-xl leading-[14px] text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("completed")}
              >
                Completed
              </span>
            </div>

            {quoteData && quoteData?.length ? (
              quoteData.map((data: Quote) => (
                <div
                  key={data.id}
                  className="bg-[#12151B] p-[20px] rounded-lg flex flex-wrap lg:gap-[0] gap-y-[20px] items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white py-[11px] px-[18px] md:mt-[0] mt-[4px] rounded-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/productImage.png"
                        alt="Filter"
                        className="md:w-[43px] md:h-[59px] w-[30px] h-[46px] object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="text-base leading-[22px] font-bold flex items-center gap-[8px]">
                        {data?.part_request?.title}{" "}
                        <span className="text-[8px] font-medium leading-[10px] text-white bg-[#52A84E] px-[9px] py-[1px] rounded-[50px]">
                          {data?.part_request?.urgency}
                        </span>
                      </h3>

                      <p className="md:text-sm text-xs leading-[22px] font-medium text-white mt-[5px]">
                        {data?.part_request?.description}
                      </p>

                      <p className="text-xs leading-[15px] font-medium text-[#A4A4A4] mt-[5px]">
                        {data?.part_request?.vehicle_make}{" "}
                        {data?.part_request?.vehicle_model}{" "}
                        {data?.part_request?.vehicle_model_trim}
                      </p>

                      <p className="text-[10px] font-medium text-[#F8F8F8] mt-[5px]">
                        Required By:{" "}
                        <span>{data?.part_request?.required_by_date}</span>
                      </p>
                    </div>
                  </div>

                  {activeTab === "accepted" ? (
                    <div className="bg-[#011827] p-[10px] border border-[#153C51] rounded-sm text-white flex flex-col w-100">
                      <span className="font-bold text-xs leading-[22px]">
                        Price:{" "}
                        <small className="font-medium ms-[6px] text-xs leading-[22px]">
                          {data?.price_cents}
                        </small>
                      </span>
                      <span className="font-bold text-xs leading-[22px]">
                        Date:{" "}
                        <small className="font-medium ms-[6px] text-xs leading-[22px]">
                          {data?.created_at}
                        </small>
                      </span>
                      <span className="font-bold flex text-xs leading-[22px]">
                        Description:{" "}
                        <small className="text-[10px] ms-[6px] mt-[5px] pb-[7px] font-medium leading-[12px]">
                          {data?.terms}
                        </small>
                      </span>
                    </div>
                  ) : (
                    <button
                      className="bg-autoblue md:text-base text-sm font-semibold leading-[14px]  md:w-[auto] w-full duration-400 px-[44px] md:py-[13px] py-[10px] rounded-sm"
                      // onClick={() => setModalOpen(true)}
                      disabled
                    >
                      {data?.status}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="font-bold flex items-center text-white">
                No quotes {}found for this user.
              </div>
            )}
          </div>
        </div>
      </div>
      <BidModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        openOTP={() => setOtpModalOpen(true)}
      />

      <OTPModal open={otpModalOpen} onClose={() => setOtpModalOpen(false)} />
    </>
  );
}
