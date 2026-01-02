import { Suspense } from "react";
import RequestPartForm from "../../components/buyer/RequestPartForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
          <div className="relative z-10 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95"></div>
            <div className="flex justify-center items-start pt-36 pb-20 px-4">
              <div className="w-[600px] relative  max-w-[100%] bg-brandBlack rounded-sm px-[40px] pt-[50px] pb-[60px]">
                 <button   
          className="absolute top-[15px] font-bold  right-[15px] bg-white cursor-pointer h-[40px] w-[40px] rounded-full"
        >
          <span className="text-black">✕</span>
        </button>
                <div className="w-[808px] max-w-[100%] ms-[auto] me-[auto]">
                  <h2 className="md:text-4xl text-lg leading-[44px] font-bold text-white mb-[30px]">
                    Select Delivery Address
                  </h2>
                  <div className="space-y-[25px]">
                    <label className="flex items-start gap-[10px] p-[10px] rounded-sm border border-[#153C51] bg-[#011827] cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        className="mt-1 h-[16px] w-[16px] autoblue"
                      />
                      <div>
                        <p className="text-white font-semibold leading-[16px] text-[13px]">
                          Asif:
                        </p>
                        <p className="mt-[5px] text-white text-xs">
                          123 Main St City, State 12345
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-[10px] p-[10px] rounded-sm border border-[#153C51] bg-[#011827] cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        className="mt-1 h-[16px] w-[16px] autoblue"
                      />
                      <div>
                        <p className="text-white font-semibold leading-[16px] text-[13px]">
                          Gurjeet:
                        </p>
                        <p className="mt-[5px] text-white text-xs">
                          123 Main St City, State 12345
                        </p>
                      </div>
                    </label>
                  </div>
                  {/* Save Button */}
                  <button
                    type="submit"
                    className="bg-autoblue mt-[30px] md:text-[18px] text-white text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                  >
                    Add New Address
                  </button>
                  <div className="mt-[30px]">
                    <h3 className="md:text-[22px] text-lg leading-[36px] font-semibold text-white mb-[18px]">
                      Payment Summary
                    </h3>
                    <div>
                      <h4 className="text-sm mb-[7px] leading-[22px] font-bold text-white">Order Details:</h4>
                      <div className="flex justify-between items-center mb-[5px]">
                        <p className="text-xs leading-[15px] font-semibold text-white">Sunroof</p>
                        <p className="text-xs leading-[15px] font-semibold text-white">Price : 1</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs leading-[15px] font-semibold text-white">Delivery: 2025-12-17</p>
                        <p className="text-xs leading-[15px] font-semibold text-white">Supplier: Muskan Supplier</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-autoblue mt-[15px] md:text-[18px] text-white text-base leading[14px] w-full rounded-sm text-white md:py-[16px] p-[13px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                  >
                    Proceed to pay
                  </button>
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
