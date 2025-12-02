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
      <div className="relative bg-[#0A1A2F] text-white w-[480px] p-10 rounded-xl shadow-xl border border-white/10">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <span className="bg-white rounded-full p-2 text-black cursor-pointer">
            ✕
          </span>
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-6">Enter OTP</h2>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              maxLength={1}
              type="text"
              className="w-14 h-14 bg-white text-black text-center text-2xl font-bold rounded-md border focus:outline-none"
            />
          ))}
        </div>

        {/* Submit */}
        <button className="w-full bg-autoblue py-3 rounded-lg text-lg hover:bg-hoverblue cursor-pointer">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />

        {/* Main Content */}
        <div className="relative z-10 flex justify-center pt-36 pb-20 px-4">
          {/* List Items */}
          <div className="space-y-6 w-full max-w-5xl rounded-lg shadow-lg ">
            <h2 className="text-xl font-bold pt-2 text-center">My bids</h2>
            <div className="text-xl pt-2 items-center flex space-x-6">
              <span
                className={`cursor-pointer ${
                  activeTab === "Active"
                    ? "font-bold text-white"
                    : "text-gray-400"
                }`}
                onClick={() => onTabClick("Active")}
              >
                Active
              </span>

              <span
                className={`cursor-pointer ${
                  activeTab === "Accepted"
                    ? "font-bold text-white"
                    : "text-gray-400"
                }`}
                onClick={() => onTabClick("Accepted")}
              >
                Accepted
              </span>

              <span
                className={`cursor-pointer ${
                  activeTab === "Canceled"
                    ? "font-bold text-white"
                    : "text-gray-400"
                }`}
                onClick={() => onTabClick("Canceled")}
              >
                Canceled
              </span>

              <span
                className={`cursor-pointer ${
                  activeTab === "Completed"
                    ? "font-bold text-white"
                    : "text-gray-400"
                }`}
                onClick={() => onTabClick("Completed")}
              >
                Completed
              </span>
            </div>

            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-[#12151B] p-6 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/productImage.png"
                    alt="Filter"
                    className="w-20 h-20 object-cover"
                  />

                  <div>
                    <h3 className="text-xl font-bold">
                      {p.title}{" "}
                      <span className="text-xs text-green-500 bg-green-900 px-2 py-0.5 rounded">
                        High
                      </span>
                    </h3>

                    <p className="text-sm text-gray-300 mt-1">{p.desc}</p>

                    <p className="text-xs text-gray-400 mt-1">{p.trim}</p>

                    <p className="text-xs text-gray-300 mt-1">
                      Required By: <span>{p.date}</span>
                    </p>
                  </div>
                </div>

                {activeTab === "Accepted" ? (
                  <div className="bg-[#011827] p-6 border border-[#153C51] text-white flex flex-col w-100">
                    <span className="font-semibold">
                      Price:{" "}
                      <small className="text-sm font-normal">$202.00</small>
                    </span>
                    <span className="font-semibold">
                      Date:{" "}
                      <small className="text-sm font-normal">12/12/2025</small>
                    </span>
                    <span className="font-semibold">
                      Description:{" "}
                      <small className="text-sm font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididun.
                      </small>
                    </span>
                  </div>
                ) : (
                  <button
                    className="bg-autoblue hover:hoverblue px-6 py-2 rounded-lg"
                    onClick={() => setModalOpen(true)}
                  >
                    Bid Now
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
