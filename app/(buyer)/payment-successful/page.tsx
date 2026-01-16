import { Suspense } from "react";
import RequestPartForm from "../../components/buyer/RequestPartForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

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
          <div className="flex flex-col justify-center items-center pt-50 pb-20 px-4">
            <div className="w-[500px] relative  max-w-[100%] rounded-sm ">
              <div className="space-y-[32px]">
                <div className="relative max-w-fit mx-auto before:content-[''] before:absolute  before:block before:h-full before:w-full before:bg-[#12C219] before:blur-[36px]
               after:content-[''] after:absolute after:w-[55px] after:h-[55px] after:bg-white after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-[1]">
                  <FaCheckCircle className="text-[80px] text-[#12C219] z-[2] relative" />
                </div>
                <h1 className="md:text-[28px] text-2xl leading-[36px] text-white font-semibold text-center">Payment Successful!</h1>
              </div>

              <div className="bg-brandBlack text-center p-[20px] rounded-sm mt-[20px]">
                <div className="flex items-center gap-[5px] text-[#12C219]">
                  <FaCheckCircle />
                  <p className="text-sm leading-[22px] text-white font-bold">Order ID: <span className="text-neutralLight font-medium">#OR-20451</span></p>
                </div>

                <div className="bg-[#011827] p-[10px] rounded-sm mt-[25px] border-[#153C51] border">
                  <div className="flex items-center justify-between text-[13px] leading-[16px] font-semibold">
                    <p>@Muikan Supplier</p>
                    <p>₹12,000</p>
                  </div>
                  <div className="flex items-center mt-[10px] justify-between text-[13px] leading-[16px] font-semibold">
                    <p>Delivery:</p>
                    <p>5 Days</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-autoblue mt-[25px] w-[240px] max-w-full text-white md:text-base text-sm leading-[14px] rounded-sm text-white md:py-[13px] md:px-[20px] py-[11px] px-[18px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  View Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <Footer />
    </main>
  );
}
