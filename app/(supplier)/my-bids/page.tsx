"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useState } from "react";
import BidModal from "@/app/components/supplier/Modal/BidModal";
function OTPModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* OTP Box */}
      <div className="relative bg-[#061D37] text-white w-[700px] max-w-[100%] py-[62px] rounded-[20px] ms-[auto] me-[auto] py-[92px] px-[30px]  shadow-xl border-2 border-[#426A84]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-[10px]  right-[10px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full">
          <span className="text-black">
            ✕
          </span>
        </button>

        {/* Title */}
        <h2 className="text-center text-4xl leading-[44px] font-bold mb-[22px]">Enter OTP</h2>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-[16px] mb-[22px]">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              maxLength={1}
              type="text"
              className="w-[90px] h-[90px] bg-white text-[#848484] text-center text-[39px] font-bold rounded-sm  focus:outline-none"
            />
          ))}
        </div>

        {/* Submit */}
        <button className="bg-[#1DA1F2] text-[22px] leading[14px] w-full rounded-sm text-white py-[20px] font-semibold hover:bg-[#1a8cd8] duration-400 cursor-pointer">
          Submit
        </button>
      </div>
    </div>
  );
}
export default function BidListPage() {
  const [activeTab, setActiveTab] = useState("Active");
  const [modalOpen, setModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  function onTabClick(tabName: string) {
    setActiveTab(tabName);
  }

  const parts = [
    {
      id: 1,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
    {
      id: 2,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
    {
      id: 3,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
    {
      id: 4,
      title: "Filter Air Cleaner",
      desc: "Air Filter for Mahindra Scorpio N, Thar 2nd Gen",
      trim: "BMW A1 Trim",
      date: "20/11/2015",
    },
  ];

  return (
    <>
      <Header></Header>
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
            <h2 className="text-2xl leading-[14px] font-bold text-center">My bids</h2>
            <div className="text-xl items-center flex space-x-[36px]   md:overflow-x-visible overflow-x-auto">
              <span
                className={`cursor-pointer font-medium text-xl md:leading-[14px] leading-[40px] ${
                  activeTab === "Active"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("Active")}
              >
                Active
              </span>

              <span
                className={`cursor-pointer font-medium text-xl md:leading-[14px] leading-[40px] ${
                  activeTab === "Accepted"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("Accepted")}
              >
                Accepted
              </span>

              <span
                className={`cursor-pointer font-medium text-xl md:leading-[14px] leading-[40px] ${
                  activeTab === "Canceled"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("Canceled")}
              >
                Canceled
              </span>

              <span
                className={`cursor-pointer font-medium text-xl md:leading-[14px] leading-[40px] ${
                  activeTab === "Completed"
                    ? "font-bold text-white"
                    : "text-[#6C6C6C]"
                }`}
                onClick={() => onTabClick("Completed")}
              >
                Completed
              </span>
            </div>

            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-[#12151B] p-[20px] rounded-lg flex flex-wrap lg:gap-[0] gap-y-[20px] items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="bg-white py-[11px] px-[18px] md:mt-[0] mt-[4px] rounded-sm">
                  <img
                    src="/productImage.png"
                    alt="Filter"
                    className="md:w-[43px] md:h-[59px] w-[30px] h-[46px] object-cover"
                  />
                  </div>

                   <div>
                    <h3 className="text-base leading-[22px] font-bold flex items-center gap-[8px]">
                      {p.title}{" "}
                      <span className="text-[8px] font-medium leading-[10px] text-white bg-[#52A84E] px-[9px] py-[1px] rounded-[50px]">
                        High
                      </span>
                    </h3>

                    <p className="md:text-sm text-xs leading-[22px] font-medium text-white mt-[5px]">{p.desc}</p>

                    <p className="text-xs leading-[15px] font-medium text-[#A4A4A4] mt-[5px]">{p.trim}</p>

                    <p className="text-[10px] font-medium text-[#F8F8F8] mt-[5px]">
                      Required By: <span>{p.date}</span>
                    </p>
                  </div>
                </div>

                {activeTab === "Accepted" ? (
                  <div className="bg-[#011827] p-[10px] border border-[#153C51] rounded-sm text-white flex flex-col w-100">
                    <span className="font-bold text-xs leading-[22px]">
                      Price:{" "}
                      <small className="font-medium ms-[6px] text-xs leading-[22px]">$202.00</small>
                    </span>
                    <span className="font-bold text-xs leading-[22px]">
                      Date:{" "}
                      <small className="font-medium ms-[6px] text-xs leading-[22px]">12/12/2025</small>
                    </span>
                    <span className="font-bold flex text-xs leading-[22px]">
                      Description:{" "}
                      <small className="text-[10px] ms-[6px] mt-[5px] pb-[7px] font-medium leading-[12px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididun.
                      </small>
                    </span>
                  </div>
                ) : (
                   <button
                  className="bg-autoblue md:text-base text-sm font-semibold leading-[14px] hover:bg-[#1a8cd8] md:w-[auto] w-full duration-400 px-[44px] md:py-[13px] py-[10px] rounded-sm cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  Quote Now
                </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <BidModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        openOTP={() => setOtpModalOpen(true)}
      />

      <OTPModal open={otpModalOpen} onClose={() => setOtpModalOpen(false)} />
      <Footer></Footer>
    </>
  );
}
