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
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/90 to-[#003253]/90" />
        {/* Sidebar */}
        <div className="relative w-72 bg-[#12151B] text-white fixed">
          <div className="bg-autoblue mt-[6rem] py-2" />
          <div className="p-4">
            <h2 className="text-xl font-bold pt-2">Filters Parts</h2>
            {/* MAKE FILTER */}
            <div className="mb-3 bg-black p-8">
              <button
                onClick={() =>
                  setFiltersOpen({ ...filtersOpen, make: !filtersOpen.make })
                }
                className="flex justify-between w-full text-left text-sm ml-3 border-b"
              >
                Make{" "}
                <FiChevronDown
                  className={filtersOpen.make ? "rotate-180" : ""}
                />
              </button>

              {filtersOpen.make && (
                <div className="mt-2 ml-3 space-y-2 text-gray-300">
                  {/* BMW */}
                  <button
                    onClick={() =>
                      setFiltersOpen({ ...filtersOpen, bmw: !filtersOpen.bmw })
                    }
                    className="flex justify-between w-full text-left text-sm border-b "
                  >
                    BMW{" "}
                    <FiChevronDown
                      className={filtersOpen.bmw ? "rotate-180" : ""}
                    />
                  </button>

                  {filtersOpen.bmw && (
                    <div className="ml-3 space-y-2 text-gray-400">
                      <button
                        onClick={() =>
                          setFiltersOpen({
                            ...filtersOpen,
                            a1: !filtersOpen.a1,
                          })
                        }
                        className="flex justify-between w-full text-left text-sm border-b "
                      >
                        A1{" "}
                        <FiChevronDown
                          className={filtersOpen.a1 ? "rotate-180" : ""}
                        />
                      </button>

                      {filtersOpen.a1 && (
                        <div className="ml-4 space-y-2 text-gray-500 text-sm border-b">
                          <p className="border-b">Trim1</p>
                          <p className="border-b">Trim1a</p>
                          <p>Trim1a</p>
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
                className="w-full bg-white text-gray-600 rounded-lg py-3 pl-4 pr-12 border border-[#1f2d3a] focus:outline-none"
              />
              <div className="bg-autoblue text-white absolute right-0 top-0 p-2 rounded-l rounded-lg h-12.5">
                <MagnifyingGlassIcon className="h-6 w-6 mt-1" />
              </div>
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-6">
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

                <button
                  className="bg-autoblue hover:hoverblue px-6 py-2 rounded-lg cursor-pointer"
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
