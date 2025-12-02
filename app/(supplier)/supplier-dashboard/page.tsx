"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
          <span className="bg-white rounded-full p-2 text-black cursor-pointer">✕</span>
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

export default function SupplierDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState({
    make: true,
    bmw: true,
    a1: true,
  });

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
      <div className="min-h-screen flex">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,50,83,0.95),rgba(0,0,0,0.95))]" />
        {/* Sidebar */}
        <div className="relative w-72 bg-[#12151B] text-white fixed">
          <div className="bg-autoblue mt-[6rem] py-2" />
          <div className="px-[20px] py-[40px]">
            <h2 className="text-2xl mb-[20px] leading-[14px]  font-bold ">Filters Parts</h2>
            {/* MAKE FILTER */}
            <div className=" bg-black p-[20px] ">
              <h4 className="text-[19px] text-white font-semibold">Make</h4>
              {filtersOpen.make && (
                <div className="mt-2  space-y-2 text-gray-300">
                  {/* BMW */}
                  <button
                    onClick={() =>
                      setFiltersOpen({ ...filtersOpen, bmw: !filtersOpen.bmw })
                    }
                    className="flex justify-between w-full text-left items-center text-[#D2D2D2] border-[#242529] font-medium text-xs leading-[33px] border-b  "
                  >
                    BMW{" "}
                    <FiChevronDown
                      className={filtersOpen.bmw ? "rotate-180 text-[18px] text-[#D2D2D2]" : ""}
                    />
                  </button>

                  {filtersOpen.bmw && (
                    <div className=" space-y-2 text-gray-400">
                      <button
                        onClick={() =>
                          setFiltersOpen({
                            ...filtersOpen,
                            a1: !filtersOpen.a1,
                          })
                        }
                        className="flex justify-between w-full text-left ps-[10px] items-center text-[#848484] border-[#242529] text-xs font-medium leading-[33px] border-b "
                      >
                        A1{" "}
                        <FiChevronDown
                          className={filtersOpen.a1 ? "rotate-180 text-[18px] text-[#D2D2D2]" : ""}
                        />
                      </button>

                      {filtersOpen.a1 && (
                        <div className=" space-y-2 text-[#848484] font-medium items-center text-xs leading-[33px]">
                          <p className="border-b ps-[30px] border-[#242529] font-medium">Trim1</p>
                          <p className="border-b ps-[30px] border-[#242529] font-medium">Trim1a</p>
                          <p className="ps-[30px] ">Trim1a</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex-1 p-10 text-white overflow-auto h-auto">
          {/* Search Bar */}
          <div className="flex justify-center my-8 pt-[5rem]">
            <div className="relative w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white text-sm text-[#848484] placeholder-[#848484] leading-[17px] rounded-sm py-[10px] px-[15px] border border-[#1f2d3a] focus:outline-none"
              />
              <div className="bg-autoblue text-white absolute right-0 flex  rounded-r-sm items-center h-full top-0 py-[10px] px-[13px] ">
                <MagnifyingGlassIcon className="h-[14px] w-[14px]" />
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-[10px]">
            {parts.map((p) => (
              <div
                key={p.id}
                className="bg-[#12151B] p-[20px] rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <div className="bg-white py-[11px] px-[18px] rounded-sm">
                  <img
                    src="/productImage.png"
                    alt="Filter"
                    className="w-[43px] h-[59px] object-cover"
                  />
                  </div>
                  <div>
                    <h3 className="text-base leading-[22px] font-bold flex items-center gap-[8px]">
                      {p.title}{" "}
                      <span className="text-[8px] font-medium leading-[10px] text-white bg-[#52A84E] px-[9px] py-[1px] rounded-[50px]">
                        High
                      </span>
                    </h3>

                    <p className="text-sm leading-[22px] font-medium text-white mt-[5px]">{p.desc}</p>

                    <p className="text-xs leading-[15px] font-medium text-[#A4A4A4] mt-[5px]">{p.trim}</p>

                    <p className="text-[10px] font-medium text-[#F8F8F8] mt-[5px]">
                      Required By: <span>{p.date}</span>
                    </p>
                  </div>
                </div>

                <button
                  className="bg-autoblue text-base font-semibold leading-[14px] hover:bg-[#1a8cd8] duration-400 px-[44px] py-[13px] rounded-sm cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  Bid Now
                </button>
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
