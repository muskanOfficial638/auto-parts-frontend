"use client";
import { Suspense } from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FaRegUser } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { PiMapPinAreaBold } from "react-icons/pi";
import Link from "next/link";

export default function RequestPartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="min-h-screen w-full relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/dashboardBg.jpg')" }}
          />
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95" /> */}
          {/* Page Content */}
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95"></div>
          <div className="flex flex-col justify-center items-center pt-36 pb-20 px-4">
            <div className="w-[830px] relative  max-w-[100%] rounded-sm ">
              <div className="flex justify-between items-center">
                <h2 className="md:text-[26px] text-[20px] font-bold leading-[14px]">Order Details</h2>
                <button onClick={() => history.back()}
                  type="submit"
                  className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Back To Order
                </button>
              </div>
              <div className="bg-brandBlack md:py-[20px] md:px-[28px] p-[20px] rounded-sm mt-[20px]">
                <div className="flex gap-2">
                  <p className="text-sm leading-[22px] font-bold text-white">Order ID:
                    <span className=" ms-[5px] font-medium text-[#B9B9B9]">OR-20451</span>
                  </p>
                  <a href="#" className="bg-[#6BB776] px-[13px] py-[3px] rounded-[3px] text-xs leading-[14px]">Accepted</a>
                </div>
                <div className="bg-[#011827] p-[10px] rounded-sm mt-[25px] border-[#153C51] border">                  
                  <Link href="#" className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px]"><FaRegUser className="text-autoblue" />@Muikan Supplier</Link>
                  <Link href="#" className="flex items-center text-[13px] font-semibold leading-[16px] gap-[8px] mt-[10px]"><TbMailFilled className="text-autoblue"/>muskan@techbeeps.co.in</Link>
                </div>
                <div className="mt-[25px]">
                  <h3 className="text-sm font-bold leading-[22px] text-white">Order Summary</h3>
                  <div className="bg-[#011827] rounded-sm border-[#153C51] border mt-[15px]">
                    <div className="md:flex block gap-[12px]">
                      <div className="p-[10px] md:w-[465px] w-full max-w-full">
                        <div className="flex items-center gap-[10px] md:border-b md:pb-[13px] border-[#153C51]">
                          <div className="bg-white rounded-sm p-[8px]">
                            <img src="/productImage.png" alt="productImage" className="h-[32px] w-[23px]" />
                          </div>
                          <div className="space-y-[3px]">
                            <p className="text-[13px] leading-sm font-semibold text-white">Sunroof</p>
                            <p className="text-[10px] leading-xs font-medium text-LightGray">Ordered Date: <span className="text-white">2024-04-24</span></p>
                            <p className="text-[10px] leading-xs font-medium text-LightGray">Delivery: <span className="text-white">5 Days</span></p>
                          </div>
                        </div>
                        <p className="text-[10px] md:mt-[10px] mt-[3px] md:text-right text-left md:ms-[0] ms-[50px] leading-xs font-medium text-LightGray">Price: <span className="text-white font-bold">₹12,000</span></p>
                      </div>
                      <div className="space-y-[10px] md:ps-[22px] md:p-[0] p-[10px] md:border-l border-t border-[#153C51]">
                        <p className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px] md:pt-[10px]"><PiMapPinAreaBold className="text-autoblue"/>Delivery Address</p>
                        <div className="space-y-[3px] ps-[24px]">
                          <p className="text-[10px] leading-xs font-medium text-white">Qasim</p>
                          <p className="text-[10px] leading-xs font-medium text-white">9876543120</p>
                          <p className="text-[10px] leading-xs font-medium text-white">Jaipur, Rajasthan - 30212</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:text-base text-sm border-b border-[#35373C] pb-[10px] font-bold mt-[15px] leading-sm flex justify-between items-center">
                    <p>Total</p>
                    <p>₹12,000</p>
                  </div>
                  <div className="flex justify-end mt-[30px]">
                    <button
                      type="submit"
                      className="bg-autoblue text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                    >
                      Get Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <Footer />
    </main>
  );
}
