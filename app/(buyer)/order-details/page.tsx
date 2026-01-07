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

          <div className="absolute inset-0 bg-gradient-to-b from-[#003253]/95 to-black/95"></div>
          <div className="flex flex-col justify-center items-center pt-36 pb-20 px-4">
            <div className="w-[830px] relative  max-w-[100%] rounded-sm ">
              <div className="flex justify-between">
                <h2 className="text-[26px] font-bold leading-[14px]">Order Details</h2>
                <button
                  type="submit"
                  className="bg-autoblue text-white text-base leading[14px] rounded-sm text-white py-[13px] px-[20px] font-semibold hover:bg-hoverblue duration-400 cursor-pointer"
                >
                  Back To Order
                </button>
              </div>
              <div className="bg-brandBlack py-[20px] px-[28px] rounded-sm mt-[20px]">
                <div className="flex gap-2">
                  <p className="text-sm leading-[22px] font-bold text-white">Order ID:
                    <span className=" ms-[5px] font-medium text-[#B9B9B9]">OR-20451</span>
                  </p>
                  <a href="#" className="bg-[#6BB776] px-[13px] py-[3px] rounded-[3px] text-xs leading-[14px">Accepted</a>
                </div>
                <div className="bg-[#011827] p-[10px] rounded-sm mt-[25px] border-[#153C51] border">
                  <a href="#" className="flex text-[13px] font-semibold leading-[16px] items-center gap-[8px]"><img src="/user-icon.svg" alt="user icon" />@Muikan Supplier</a>
                  <a href="#" className="flex items-center text-[13px] font-semibold leading-[16px] gap-[8px] mt-[10px]"><img src="/mail-icon.svg" alt="mail icon" />muskan@techbeeps.co.in</a>
                </div>
                <div className="mt-[25px]">
                  <h3 className="text-sm font-bold leading-[22px] text-white">Order Summary</h3>
                  <div className="bg-[#011827] p-[10px] rounded-sm border-[#153C51] border mt-[15px]">
                    <div className="">
                      <div className="flex items-center gap-[10px] border-b pb-[13px] border-[#153C51]">
                        <div className="bg-white rounded-sm p-[8px]">
                          <img src="/productImage.png" alt="productImage" className="h-[32px] w-[23px]" />
                        </div>
                        <div className="space-y-[3px]">
                          <p className="text-[13px] leading-sm font-semibold text-white">Sunroof</p>
                          <p className="text-[10px] leading-xs font-medium text-LightGray">Ordered Date: <span className="text-white">2024-04-24</span></p>
                          <p className="text-[10px] leading-xs font-medium text-LightGray">Delivery: <span className="text-white">5 Days</span></p>
                        </div>
                      </div>
                      <p className="text-[10px] mt-[10px] text-right leading-xs font-medium text-LightGray">Price: <span className="text-white font-bold">₹12,000</span></p>
                    </div>
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
